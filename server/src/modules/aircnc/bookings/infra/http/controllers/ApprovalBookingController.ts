import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ApprovalBookingService from '@modules/aircnc/bookings/services/ApprovalBookingService';

export default class ApprovalBookingsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { booking_id } = request.params;

    const approvalBookingService = container.resolve(ApprovalBookingService);

    const booking = await approvalBookingService.execute(booking_id);

    if (booking) {
      if (request.connectedUsers) {
        const bookingUserSocket = request.connectedUsers[booking.user];

        if (bookingUserSocket) {
          if (request.io) {
            request.io.to(bookingUserSocket).emit('booking_response', booking);
          }
        }
      }
    }

    return response.json(booking);
  }
}
