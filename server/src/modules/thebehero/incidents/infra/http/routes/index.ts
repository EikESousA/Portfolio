import { Router } from 'express';

import IncidentController from '@modules/thebehero/incidents/infra/http/controllers/IncidentController';
import ProfileController from '@modules/thebehero/incidents/infra/http/controllers/ProfileController';

const incidentsRouter = Router();

const incidentController = new IncidentController();
const profileController = new ProfileController();

incidentsRouter.get('/', incidentController.index);
incidentsRouter.post('/', incidentController.store);
incidentsRouter.get('/profile', profileController.index);
incidentsRouter.delete('/:incident_id', incidentController.delete);

export default incidentsRouter;
