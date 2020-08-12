import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBookingsRepository from '@modules/aircnc/bookings/repositories/IBookingsRepository';

import { IBooking } from '@modules/aircnc/bookings/infra/mongoose/entities/Booking';

@injectable()
export default class RejectionBookingService {
  constructor(
    @inject('AirCnC_BookingsRepository')
    private bookingsRepository: IBookingsRepository,
  ) {}

  public async execute(booking_id: string): Promise<IBooking> {
    let booking = await this.bookingsRepository.findById(booking_id);

    if (!booking) {
      throw new AppError("Booking doesn't exists!", 400);
    }

    booking = await this.bookingsRepository.updateApprovedByIdJoinSpot(
      booking,
      false,
    );

    return booking;
  }
}
