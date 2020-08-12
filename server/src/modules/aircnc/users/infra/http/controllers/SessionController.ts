import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/aircnc/users/services/AuthenticateUserService';

export default class SessionController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    try {
      const user = await authenticateUserService.execute({
        email,
      });
      return response.json(user);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }
}
