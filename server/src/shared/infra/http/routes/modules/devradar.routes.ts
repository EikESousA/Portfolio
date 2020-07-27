import { Router } from 'express';

import devsRouter from '@modules/devradar/devs/infra/http/routes';

const devRadarRouter = Router();

devRadarRouter.use('/devs', devsRouter);

export default devRadarRouter;
