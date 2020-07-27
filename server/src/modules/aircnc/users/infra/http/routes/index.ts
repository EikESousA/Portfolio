import { Router } from 'express';

import SessionController from '@modules/aircnc/users/infra/http/controllers/SessionController';

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post('/', sessionController.store);

export default sessionRouter;
