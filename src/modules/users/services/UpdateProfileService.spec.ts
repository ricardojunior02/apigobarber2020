import AppError from '@shared/error/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider
    );
  });
  it('should be able update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ricardo',
      email: 'ricardo@gmail.com',
      password: '123456',
    });

    await updateProfileService.execute({
      user_id: user.id,
      name: 'Pedro',
      email: 'Pedro@gmail.com',
    });

    expect(user.name).toBe('Pedro');
    expect(user.email).toBe('Pedro@gmail.com');
  });
  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existint-user',
        name: 'test',
        email: 'test@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to change to anothewr user email', async () => {
    await fakeUserRepository.create({
      name: 'Ricardo',
      email: 'ricardo@gmail.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Test',
      email: 'test@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Ricardo',
        email: 'ricardo@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ricardo',
      email: 'ricardo@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Pedro',
      email: 'Pedro@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ricardo',
      email: 'ricardo@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Pedro',
        email: 'Pedro@gmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ricardo',
      email: 'ricardo@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Pedro',
        email: 'Pedro@gmail.com',
        old_password: 'wrong-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
