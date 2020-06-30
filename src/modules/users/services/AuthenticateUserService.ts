import { sign } from 'jsonwebtoken';
import AppError from '@shared/error/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';

import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashedProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  email: string;

  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashedProvider: IHashedProvider
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'Email ou senha incorretos, Verifique seus dados',
        401
      );
    }

    const passwordMatched = await this.hashedProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError(
        'Email ou senha incorretos, Verifique seus dados',
        401
      );
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
