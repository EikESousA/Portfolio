import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchDevService from '@modules/devradar/devs/services/SearchDevService';

export default class SearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { latitude, longitude, techs } = request.query;

    const searchDevService = container.resolve(SearchDevService);

    try {
      const devs = await searchDevService.execute({
        latitude: Number(latitude),
        longitude: Number(longitude),
        techs: String(techs),
      });
      return response.json(devs);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }
}
