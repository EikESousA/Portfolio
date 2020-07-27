import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowDashboardService from '@modules/aircnc/spots/services/ShowDashboardService';

export default class DashboardController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.headers;

    const user_idString = String(user_id);

    const showDashboardService = container.resolve(ShowDashboardService);

    const spots = await showDashboardService.execute(user_idString);

    return response.json(spots);
  }
}
