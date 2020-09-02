import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowItemsService from '@modules/ecoleta/items/services/ShowItemsService';

export default class ItemsController {
  async index(request: Request, response: Response): Promise<Response> {
    const showItemsService = container.resolve(ShowItemsService);
    const items = await showItemsService.execute();
    return response.json(items);
  }
}
