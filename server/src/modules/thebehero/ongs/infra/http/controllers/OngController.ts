import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowOngsService from '@modules/thebehero/ongs/services/ShowOngsService';
import CreateOngService from '@modules/thebehero/ongs/services/CreateOngService';

export default class OngController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showOngsService = container.resolve(ShowOngsService);

    try {
      const ongs = await showOngsService.execute();
      return response.json(ongs);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, whatsapp, city, uf } = request.body;

    const createOngService = container.resolve(CreateOngService);

    try {
      const ong = await createOngService.execute({
        name: String(name),
        email: String(email),
        whatsapp: String(whatsapp),
        city: String(city),
        uf: String(uf),
      });
      return response.json(ong);
    } catch (err) {
      return response.status(err.statusCode).json(err.message);
    }
  }
}
