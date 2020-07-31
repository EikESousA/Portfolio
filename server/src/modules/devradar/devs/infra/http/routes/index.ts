import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DevController from '@modules/devradar/devs/infra/http/controllers/DevController';
import SearchController from '@modules/devradar/devs/infra/http/controllers/SearchController';

const devRouter = Router();

const devController = new DevController();
const searchController = new SearchController();

devRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      github_username: Joi.string().required(),
      techs: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    }),
  }),
  devController.store,
);
devRouter.get('/', devController.index);
devRouter.get(
  '/search',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      techs: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    }),
  }),
  searchController.index,
);

export default devRouter;
