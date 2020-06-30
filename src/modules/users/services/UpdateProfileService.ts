import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProviser from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProviser: IHashProviser
  ) {}

  public async execute({
    user_id,
    email,
    name,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdateEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.'
      );
    }

    if (password && old_password) {
      const compareHash = await this.hashProviser.compareHash(
        old_password,
        user.password
      );

      if (!compareHash) {
        throw new AppError('Old password is wrong');
      }
      user.password = await this.hashProviser.generateHash(password);
    }

    user.name = name;
    user.email = email;

    return this.userRepository.save(user);
  }
}

export default UpdateProfileService;
