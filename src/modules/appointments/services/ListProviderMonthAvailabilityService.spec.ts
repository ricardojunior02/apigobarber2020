// import AppError from '@shared/error/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the month availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 3, 2, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 1, 2, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 1, 2, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 1, 2, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 1, 2, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 1, 2, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 1, 2, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 1, 2, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 1, 2, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 1, 2, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2020, 1, 2, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      month: 2,
      provider_id: '123456',
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 1, available: true },
        { day: 2, available: false },
        { day: 3, available: true },
        { day: 1, available: true },
      ])
    );
  });
});
