import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowOngsService from '@modules/thebehero/ongs/services/ShowOngsService';
import CreateOngService from '@modules/thebehero/ongs/services/CreateOngService';

export default class OngController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showOngsService = container.resolve(ShowOngsService);

    const ongs = await showOngsService.execute();

    return response.json(ongs);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, whatsapp, city, uf } = request.body;

    const createOngService = container.resolve(CreateOngService);

    const ong = await createOngService.execute({
      name: String(name),
      email: String(email),
      whatsapp: Number(whatsapp),
      city: String(city),
      uf: String(uf),
    });

    return response.json(ong);
  }
}
