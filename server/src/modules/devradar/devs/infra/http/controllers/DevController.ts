import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowDevsService from '@modules/devradar/devs/services/ShowDevsService';
import CreateDevService from '@modules/devradar/devs/services/CreateDevService';

export default class DevController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showDevsService = container.resolve(ShowDevsService);

    try {
      const devs = await showDevsService.execute();
      return response.json(devs);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { github_username, techs, latitude, longitude } = request.body;

    const createDevService = container.resolve(CreateDevService);

    try {
      const devs = await createDevService.execute({
        github_username: String(github_username),
        techs: String(techs),
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
      return response.json(devs);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }
}
