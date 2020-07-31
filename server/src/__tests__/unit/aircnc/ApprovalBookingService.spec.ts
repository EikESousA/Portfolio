import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/aircnc/users/repositories/fakes/FakeUsersRepository';
import FakeSpotsRepository from '@modules/aircnc/spots/repositories/fakes/FakeSpotsRepository';
import FakeBookingRepository from '@modules/aircnc/bookings/repositories/fakes/FakeBookingsRepository';

import AuthenticateUserService from '@modules/aircnc/users/services/AuthenticateUserService';
import CreateSpotService from '@modules/aircnc/spots/services/CreateSpotService';
import CreateBookingService from '@modules/aircnc/bookings/services/CreateBookingService';
import ApprovalBookingService from '@modules/aircnc/bookings/services/ApprovalBookingService';

let fakeUsersRepository: FakeUsersRepository;
let fakeSpotsRepository: FakeSpotsRepository;
let fakeBookingRepository: FakeBookingRepository;

let authenticateUserService: AuthenticateUserService;
let createSpotService: CreateSpotService;
let createBookingService: CreateBookingService;
let approvalBookingService: ApprovalBookingService;

describe('ApprovalBookingService', () => {
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
    approvalBookingService = new ApprovalBookingService(fakeBookingRepository);
  });

  it('should be able to approve a booking!', async () => {
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

    await approvalBookingService.execute(booking.id);

    expect(booking.approved).toEqual(true);
  });

  it('should not be able to approve a booking because the booking does not exist!', async () => {
    await expect(
      approvalBookingService.execute('not-exist-booking'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
