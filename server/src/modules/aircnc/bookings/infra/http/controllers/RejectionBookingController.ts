import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RejectionBookingService from '@modules/aircnc/bookings/services/RejectionBookingService';

export default class RejectionBookingsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { booking_id } = request.params;

    const rejectionBookingService = container.resolve(RejectionBookingService);

    try {
      const booking = await rejectionBookingService.execute(booking_id);
      if (booking) {
        if (request.connections) {
          const bookingUserSocket = request.connections[booking.user];

          if (bookingUserSocket) {
            if (request.io) {
              request.io
                .to(bookingUserSocket)
                .emit('booking_response', booking);
            }
          }
        }
      }
      return response.json(booking);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }
}
