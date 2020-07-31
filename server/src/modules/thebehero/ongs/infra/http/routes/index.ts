import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OngController from '@modules/thebehero/ongs/infra/http/controllers/OngController';
import SessionController from '@modules/thebehero/ongs/infra/http/controllers/SessionController';

const ongRouter = Router();

const ongController = new OngController();
const sessionController = new SessionController();

ongRouter.get('/', ongController.index);
ongRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),
  ongController.store,
);
ongRouter.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  sessionController.store,
);

export default ongRouter;
