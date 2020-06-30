// import AppError from '@shared/error/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUserRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Ricardo',
      email: 'ricardo@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Ricardo2',
      email: 'ricardo2@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Ricardo3',
      email: 'ricardo3@gmail.com',
      password: '123456',
    });

    const provider = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(provider).toEqual([user1, user2]);
  });
});
