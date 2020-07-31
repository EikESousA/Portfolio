import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import DashboardController from '@modules/aircnc/spots/infra/http/controllers/DashboardController';
import SpotController from '@modules/aircnc/spots/infra/http/controllers/SpotController';

import uploadConfig from '@config/upload';

const spotsRouter = Router();
const upload = multer(uploadConfig.multer);

const dashboardController = new DashboardController();
const spotController = new SpotController();

spotsRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      tech: Joi.string().required(),
    }),
  }),
  spotController.index,
);
spotsRouter.post(
  '/',
  upload.single('thumbnail'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      company: Joi.string().required(),
      techs: Joi.string().required(),
      price: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object().keys({
      user_id: Joi.string().required(),
    }),
  }),
  spotController.store,
);
spotsRouter.get(
  '/dashboard',
  celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      user_id: Joi.string().required(),
    }),
  }),
  dashboardController.show,
);

export default spotsRouter;
