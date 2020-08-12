import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowIncidentsUserService from '@modules/thebehero/incidents/services/ShowIncidentsUserService';

export default class IncidentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const ong_id = request.headers.authorization;

    const showIncidentsUserService = container.resolve(
      ShowIncidentsUserService,
    );

    try {
      const incidents = await showIncidentsUserService.execute({
        ong_id: String(ong_id),
      });
      return response.json(incidents);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }
}
