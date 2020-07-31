import { Router } from 'express';

import OngController from '@modules/thebehero/ongs/infra/http/controllers/OngController';
import SessionController from '@modules/thebehero/ongs/infra/http/controllers/SessionController';

const ongRouter = Router();

const ongController = new OngController();
const sessionController = new SessionController();

ongRouter.get('/', ongController.index);
ongRouter.post('/', ongController.store);
ongRouter.post('/sessions', sessionController.store);

export default ongRouter;
