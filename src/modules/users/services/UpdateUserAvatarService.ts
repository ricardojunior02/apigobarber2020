import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

interface IRequest {
  user_id: string;

  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Usuario não tem permissão para update de avatar',
        401
      );
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
