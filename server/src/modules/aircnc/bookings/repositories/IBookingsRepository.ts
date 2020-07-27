import { IBooking } from '@modules/aircnc/bookings/infra/mongoose/entities/Booking';
import ICreateBookingDTO from '@modules/aircnc/bookings/dtos/ICreateBookingDTO';

export default interface IBookingsRepository {
  createWithFullJoin(data: ICreateBookingDTO): Promise<IBooking>;
  findById(booking_id: string): Promise<IBooking | undefined>;
  updateApprovedByIdJoinSpot(
    booking: IBooking,
    approved: boolean,
  ): Promise<IBooking>;
}
