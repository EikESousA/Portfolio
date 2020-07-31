import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import IncidentController from '@modules/thebehero/incidents/infra/http/controllers/IncidentController';
import ProfileController from '@modules/thebehero/incidents/infra/http/controllers/ProfileController';

const incidentsRouter = Router();

const incidentController = new IncidentController();
const profileController = new ProfileController();

incidentsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  incidentController.index,
);
incidentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required().email(),
      value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  incidentController.store,
);
incidentsRouter.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  profileController.index,
);
incidentsRouter.delete(
  '/:incident_id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      incident_id: Joi.number().required(),
    }),
  }),
  incidentController.delete,
);

export default incidentsRouter;
