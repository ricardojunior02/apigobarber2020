import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashedProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;

  email: string;

  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashedProvider: IHashedProvider,
    @inject('CacheProvider') private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkEmail = await this.userRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError('Email ja está em uso');
    }

    const hashedPassword = await this.hashedProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
