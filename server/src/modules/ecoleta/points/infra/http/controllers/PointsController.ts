import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePoint from '@modules/ecoleta/points/services/CreatePoint';
import ShowPointsWithFilter from '@modules/ecoleta/points/services/ShowPointsWithFilter';
import ShowPointsWithId from '@modules/ecoleta/points/services/ShowPointsWithId';

export default class PointsController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const createPoint = container.resolve(CreatePoint);

    const point = await createPoint.execute({
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    });

    return response.json({ id: point.id, ...point });
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const showPointsWithFilter = container.resolve(ShowPointsWithFilter);

    const points = await showPointsWithFilter.execute({
      items: parsedItems,
      city,
      uf,
    });

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.25.9:3333/uploads/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPointsWithId = container.resolve(ShowPointsWithId);

    const { point, items } = await showPointsWithId.execute({
      id,
    });

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.25.9:3333/uploads/${point.image}`,
    };

    return response.json({ point: serializedPoint, items });
  }
}
