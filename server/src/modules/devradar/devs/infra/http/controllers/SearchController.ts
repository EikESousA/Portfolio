import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchDevService from '@modules/devradar/devs/services/SearchDevService';

export default class SearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { latitude, longitude, techs } = request.query;

    const latitudeString = Number(latitude);
    const longitudeString = Number(longitude);
    const techsString = String(techs);

    const searchDevService = container.resolve(SearchDevService);

    const devs = await searchDevService.execute({
      latitude: latitudeString,
      longitude: longitudeString,
      techs: techsString,
    });

    return response.json(devs);
  }
}
