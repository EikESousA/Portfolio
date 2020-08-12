import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBookingService from '@modules/aircnc/bookings/services/CreateBookingService';

export default class BookingsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.headers;
    const { spot_id } = request.params;
    const { date } = request.body;

    const createBookingService = container.resolve(CreateBookingService);

    try {
      const booking = await createBookingService.execute({
        user: String(user_id),
        spot: spot_id,
        date,
      });
      return response.json(booking);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }
}
