import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowDevsService from '@modules/tindev/devs/services/ShowDevsService';
import CreateDevService from '@modules/tindev/devs/services/CreateDevService';

export default class DevController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.headers;

    const showDevsService = container.resolve(ShowDevsService);

    const devs = await showDevsService.execute({ user_id: String(user_id) });

    return response.json(devs);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { username } = request.body;

    const usernameString = String(username);

    const createDevService = container.resolve(CreateDevService);

    const dev = await createDevService.execute(usernameString);

    return response.json(dev);
  }
}
