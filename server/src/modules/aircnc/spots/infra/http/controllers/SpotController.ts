import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSpotService from '@modules/aircnc/spots/services/CreateSpotService';
import ShowSpotsService from '@modules/aircnc/spots/services/ShowSpotsService';

export default class SpotController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { tech } = request.query;

    const showSpotsService = container.resolve(ShowSpotsService);

    const spots = await showSpotsService.execute({ tech: String(tech) });

    return response.json(spots);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const { company, techs, price } = request.body;
    const { user_id } = request.headers;

    const createSpotService = container.resolve(CreateSpotService);

    const techsFormatted = String(techs)
      .split(',')
      .map(tech => tech.trim());

    const data = {
      user: String(user_id),
      thumbnail: filename,
      company,
      techs: techsFormatted,
      price,
    };

    const spot = await createSpotService.execute(data);

    return response.json(spot);
  }
}
