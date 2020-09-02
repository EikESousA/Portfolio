import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import multerConfig from '@config/upload';

import PointsController from '@modules/ecoleta/points/infra/http/controllers/PointsController';

const pointRouter = Router();

const pointsController = new PointsController();

const upload = multer(multerConfig.multer);

pointRouter.get('/points', pointsController.index);

pointRouter.get('/points/:id', pointsController.show);

pointRouter.post(
  '/points',
  upload.single('image'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    }),
  }),
  pointsController.create,
);

export default pointRouter;
