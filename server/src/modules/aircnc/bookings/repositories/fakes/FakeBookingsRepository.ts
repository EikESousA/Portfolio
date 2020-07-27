/* eslint-disable no-param-reassign */
import IBookingsRepository from '@modules/aircnc/bookings/repositories/IBookingsRepository';
import Booking, {
  IBooking,
} from '@modules/aircnc/bookings/infra/mongoose/entities/Booking';
import ICreateBookingDTO from '@modules/aircnc/bookings/dtos/ICreateBookingDTO';

class BookingsRepository implements IBookingsRepository {
  private bookings: IBooking[] = [];

  public async createWithFullJoin(data: ICreateBookingDTO): Promise<IBooking> {
    const booking = new Booking();
    Object.assign(booking, data);
    this.bookings.push(booking);
    return booking;
  }

  public async findById(booking_id: string): Promise<IBooking | undefined> {
    const booking = this.bookings.find(
      findBooking => String(findBooking.id) === booking_id,
    );
    return booking || undefined;
  }

  public async updateApprovedByIdJoinSpot(
    booking: IBooking,
    approved: boolean,
  ): Promise<IBooking> {
    Object.assign(booking, (booking.approved = approved));
    return booking;
  }
}

export default BookingsRepository;
