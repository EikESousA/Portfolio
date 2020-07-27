import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBookingService from '@modules/aircnc/bookings/services/CreateBookingService';

export default class BookingsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.headers;
    const { spot_id } = request.params;
    const { date } = request.body;

    const userString = String(user_id);

    const data = { user: userString, spot: spot_id, date };

    const createBookingService = container.resolve(CreateBookingService);

    const booking = await createBookingService.execute(data);

    return response.json(booking);
  }
}
