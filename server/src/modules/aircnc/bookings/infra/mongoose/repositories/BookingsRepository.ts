/* eslint-disable no-param-reassign */
import IBookingsRepository from '@modules/aircnc/bookings/repositories/IBookingsRepository';
import Booking, {
  IBooking,
} from '@modules/aircnc/bookings/infra/mongoose/entities/Booking';
import ICreateBookingDTO from '@modules/aircnc/bookings/dtos/ICreateBookingDTO';

export default class BookingsRepository implements IBookingsRepository {
  public async createWithFullJoin(data: ICreateBookingDTO): Promise<IBooking> {
    const { user, spot, date } = data;

    const booking = await Booking.create({
      user,
      spot,
      date,
    });

    await booking
      .populate('aircnc_spot')
      .populate('aircnc_user')
      .execPopulate();

    return booking;
  }

  public async findById(booking_id: string): Promise<IBooking | undefined> {
    try {
      const booking = await Booking.findOne({ _id: booking_id });
      return booking || undefined;
    } catch (err) {
      return undefined;
    }
  }

  public async updateApprovedByIdJoinSpot(
    booking: IBooking,
    approved: boolean,
  ): Promise<IBooking> {
    booking.approved = approved;
    await booking.save();
    const bookingPopulate = booking.populate('aircnc_spot').execPopulate();
    return bookingPopulate;
  }
}
