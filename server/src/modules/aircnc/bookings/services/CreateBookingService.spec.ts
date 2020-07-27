import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/aircnc/users/repositories/fakes/FakeUsersRepository';
import FakeSpotsRepository from '@modules/aircnc/spots/repositories/fakes/FakeSpotsRepository';
import FakeBookingRepository from '@modules/aircnc/bookings/repositories/fakes/FakeBookingsRepository';

import AuthenticateUserService from '@modules/aircnc/users/services/AuthenticateUserService';
import CreateSpotService from '@modules/aircnc/spots/services/CreateSpotService';
import CreateBookingService from '@modules/aircnc/bookings/services/CreateBookingService';

let fakeUsersRepository: FakeUsersRepository;
let fakeSpotsRepository: FakeSpotsRepository;
let fakeBookingRepository: FakeBookingRepository;

let authenticateUserService: AuthenticateUserService;
let createSpotService: CreateSpotService;
let createBookingService: CreateBookingService;

describe('CreateBookingService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSpotsRepository = new FakeSpotsRepository();
    fakeBookingRepository = new FakeBookingRepository();

    authenticateUserService = new AuthenticateUserService(fakeUsersRepository);
    createSpotService = new CreateSpotService(
      fakeUsersRepository,
      fakeSpotsRepository,
    );
    createBookingService = new CreateBookingService(
      fakeUsersRepository,
      fakeSpotsRepository,
      fakeBookingRepository,
    );
  });

  it('must be able to create a new booking!', async () => {
    const user_1 = await authenticateUserService.execute({
      email: 'teste_1@example.com',
    });

    const user_2 = await authenticateUserService.execute({
      email: 'teste_2@example.com',
    });

    const spot = await createSpotService.execute({
      user: user_1.id,
      thumbnail: 'teste_imagem_1',
      company: 'teste_company_1',
      techs: ['tech_1_1', 'tech_1_2'],
      price: 1,
    });

    const booking = await createBookingService.execute({
      user: user_2.id,
      spot: spot.id,
      date: '25/07/2020',
    });

    expect(String(booking.user)).toEqual(String(user_2.id));
  });

  it('should not be able to create a new booking because there is no user!', async () => {
    const user_1 = await authenticateUserService.execute({
      email: 'teste_1@example.com',
    });

    const spot = await createSpotService.execute({
      user: user_1.id,
      thumbnail: 'teste_imagem_1',
      company: 'teste_company_1',
      techs: ['tech_1_1', 'tech_1_2'],
      price: 1,
    });

    await expect(
      createBookingService.execute({
        user: 'not-exist-user',
        spot: spot.id,
        date: '25/07/2020',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new booking because there is no spot!', async () => {
    await authenticateUserService.execute({
      email: 'teste_1@example.com',
    });

    const user_2 = await authenticateUserService.execute({
      email: 'teste_2@example.com',
    });

    await expect(
      createBookingService.execute({
        user: user_2.id,
        spot: 'not-exist-spot',
        date: '25/07/2020',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
