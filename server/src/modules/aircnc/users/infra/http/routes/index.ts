import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '@modules/aircnc/users/infra/http/controllers/SessionController';

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  }),
  sessionController.store,
);

export default sessionRouter;
