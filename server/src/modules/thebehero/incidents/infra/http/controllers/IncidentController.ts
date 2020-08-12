import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowIncidentsService from '@modules/thebehero/incidents/services/ShowIncidentsService';
import CreateIncidentService from '@modules/thebehero/incidents/services/CreateIncidentService';
import DeleteIncidentService from '@modules/thebehero/incidents/services/DeleteIncidentService';

export default class IncidentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1 } = request.query;

    const showIncidentsService = container.resolve(ShowIncidentsService);

    try {
      const { incidents, count } = await showIncidentsService.execute({
        page: Number(page),
      });
      response.header('X-Total-Count', String(count));
      return response.json(incidents);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const createIncidentService = container.resolve(CreateIncidentService);

    try {
      const incident = await createIncidentService.execute({
        title,
        description,
        value,
        ong_id: String(ong_id),
      });
      return response.json(incident);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { incident_id } = request.params;
    const ong_id = request.headers.authorization;

    const deleteIncidentService = container.resolve(DeleteIncidentService);

    try {
      await deleteIncidentService.execute({
        incident_id,
        ong_id: String(ong_id),
      });
      return response.status(204).send();
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }
}
