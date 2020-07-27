import { Request, Response } from 'express';
import { container } from 'tsyringe';

import LikeDevService from '@modules/tindev/devs/services/LikeDevService';

export default class LikeController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { dev_id } = request.params;
    const { user_id } = request.headers;

    const userString = String(user_id);

    const likeDevService = container.resolve(LikeDevService);

    const { loggedDev, targetDev } = await likeDevService.execute(
      userString,
      dev_id,
    );

    if (targetDev.likes.includes(loggedDev.id)) {
      if (request.connectedUsers && request.io) {
        const loggedSocket = request.connectedUsers[userString];
        const targetSocket = request.connectedUsers[dev_id];

        if (loggedSocket) {
          request.io.to(loggedSocket).emit('match', targetDev);
        }

        if (targetSocket) {
          request.io.to(targetSocket).emit('match', loggedDev);
        }
      }
    }

    return response.json(loggedDev);
  }
}
