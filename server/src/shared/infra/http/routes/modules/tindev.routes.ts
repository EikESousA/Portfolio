import { Router } from 'express';

import devRouter from '@modules/tindev/devs/infra/http/routes';

const tindevRouter = Router();

tindevRouter.use('/devs', devRouter);

export default tindevRouter;
