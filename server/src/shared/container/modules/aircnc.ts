import { container } from 'tsyringe';

import IUsersRepository from '@modules/aircnc/users/repositories/IUsersRepository';
import UsersRepository from '@modules/aircnc/users/infra/mongoose/repositories/UsersRepository';

import ISpotsRepository from '@modules/aircnc/spots/repositories/ISpotsRepository';
import SpotsRepository from '@modules/aircnc/spots/infra/mongoose/repositories/SpotsRepository';

import IBookingsRepository from '@modules/aircnc/bookings/repositories/IBookingsRepository';
import BookingsRepository from '@modules/aircnc/bookings/infra/mongoose/repositories/BookingsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ISpotsRepository>(
  'SpotsRepository',
  SpotsRepository,
);

container.registerSingleton<IBookingsRepository>(
  'BookingsRepository',
  BookingsRepository,
);
