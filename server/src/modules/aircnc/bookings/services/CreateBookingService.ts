import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/aircnc/users/repositories/IUsersRepository';
import ISpotsRepository from '@modules/aircnc/spots/repositories/ISpotsRepository';
import IBookingsRepository from '@modules/aircnc/bookings/repositories/IBookingsRepository';

import { IBooking } from '@modules/aircnc/bookings/infra/mongoose/entities/Booking';
import ICreateBookingDTO from '@modules/aircnc/bookings/dtos/ICreateBookingDTO';

@injectable()
export default class CreateBookingService {
  constructor(
    @inject('AirCnC_UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AirCnC_SpotsRepository')
    private spotsRepository: ISpotsRepository,
    @inject('AirCnC_BookingsRepository')
    private bookingsRepository: IBookingsRepository,
  ) {}

  public async execute(data: ICreateBookingDTO): Promise<IBooking> {
    const user = await this.usersRepository.findByUserId(data.user);

    if (!user) {
      throw new AppError("User doesn't exists!", 400);
    }

    const spot = await this.spotsRepository.findBySpotId(data.spot);

    if (!spot) {
      throw new AppError("Spot doesn't exists!", 400);
    }

    const booking = await this.bookingsRepository.createWithFullJoin(data);

    return booking;
  }
}
