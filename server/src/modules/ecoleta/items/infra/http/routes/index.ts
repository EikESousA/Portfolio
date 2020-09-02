import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ItemsController from '@modules/ecoleta/items/infra/http/controllers/ItemsController';

const itemRouter = Router();

const itemsController = new ItemsController();

itemRouter.get('/items', itemsController.index);

export default itemRouter;
