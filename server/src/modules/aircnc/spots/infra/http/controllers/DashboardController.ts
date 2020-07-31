import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowDashboardService from '@modules/aircnc/spots/services/ShowDashboardService';

export default class DashboardController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.headers;

    const showDashboardService = container.resolve(ShowDashboardService);

    const spots = await showDashboardService.execute({
      user_id: String(user_id),
    });

    return response.json(spots);
  }
}
