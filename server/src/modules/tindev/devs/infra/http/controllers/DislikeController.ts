import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DislikeDevService from '@modules/tindev/devs/services/DislikeDevService';

export default class DislikeController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { dev_id } = request.params;
    const { user_id } = request.headers;

    const dislikeDevService = container.resolve(DislikeDevService);

    try {
      const { loggedDev } = await dislikeDevService.execute({
        user_id: String(user_id),
        dev_id,
      });
      return response.json(loggedDev);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }
}
