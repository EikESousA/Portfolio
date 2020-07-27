import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DislikeDevService from '@modules/tindev/devs/services/DislikeDevService';

export default class DislikeController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { dev_id } = request.params;
    const { user_id } = request.headers;

    const userString = String(user_id);

    const dislikeDevService = container.resolve(DislikeDevService);

    const { loggedDev } = await dislikeDevService.execute(userString, dev_id);

    return response.json(loggedDev);
  }
}
