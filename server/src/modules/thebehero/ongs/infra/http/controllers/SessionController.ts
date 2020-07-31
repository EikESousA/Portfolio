import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateService from '@modules/thebehero/ongs/services/AuthenticateService';

export default class SessionController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const authenticateService = container.resolve(AuthenticateService);

    const ong = await authenticateService.execute({
      id: String(id),
    });

    return response.json(ong);
  }
}
