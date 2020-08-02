import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DevController from '@modules/tindev/devs/infra/http/controllers/DevController';
import LikeController from '@modules/tindev/devs/infra/http/controllers/LikeController';
import DislikeController from '@modules/tindev/devs/infra/http/controllers/DislikeController';

const devRouter = Router();

const devController = new DevController();
const likeController = new LikeController();
const dislikeController = new DislikeController();

devRouter.get(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      user_id: Joi.string().required(),
    }).unknown(),
  }),
  devController.index,
);

devRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
    }),
  }),
  devController.store,
);

devRouter.post(
  '/:dev_id/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      dev_id: Joi.string().required(),
    }).unknown(),
    [Segments.HEADERS]: Joi.object({
      user_id: Joi.string().required(),
    }).unknown(),
  }),
  likeController.store,
);

devRouter.post(
  '/:dev_id/dislikes',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      dev_id: Joi.string().required(),
    }).unknown(),
    [Segments.HEADERS]: Joi.object({
      user_id: Joi.string().required(),
    }).unknown(),
  }),
  dislikeController.store,
);

export default devRouter;
