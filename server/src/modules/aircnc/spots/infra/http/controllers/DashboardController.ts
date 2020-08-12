import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowDashboardService from '@modules/aircnc/spots/services/ShowDashboardService';

export default class DashboardController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.headers;

    const showDashboardService = container.resolve(ShowDashboardService);

    try {
      const spots = await showDashboardService.execute({
        user_id: String(user_id),
      });
      return response.json(spots);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }
}
