import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowDevsService from '@modules/devradar/devs/services/ShowDevsService';
import CreateDevService from '@modules/devradar/devs/services/CreateDevService';

export default class DevController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showDevsService = container.resolve(ShowDevsService);

    const devs = await showDevsService.execute();

    return response.json(devs);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { github_username, techs, latitude, longitude } = request.body;

    const github_usernameString = String(github_username);
    const techsString = String(techs);
    const latitudeNumber = Number(latitude);
    const longitudeNumber = Number(longitude);

    const createDevService = container.resolve(CreateDevService);

    const devs = await createDevService.execute({
      github_username: github_usernameString,
      techs: techsString,
      latitude: latitudeNumber,
      longitude: longitudeNumber,
    });

    return response.json(devs);
  }
}
