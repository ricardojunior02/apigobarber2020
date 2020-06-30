import AppError from '@shared/error/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
describe('AUthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ricardo',
      email: 'ricardo@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'ricardo@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'ricardo@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to authenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'Ricardo',
      email: 'ricardo@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'ricardo@gmail.com',
        password: 'wrong-error',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
