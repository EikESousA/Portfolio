import { Router } from 'express';

import itemsRouter from '@modules/ecoleta/items/infra/http/routes';
import pointsRouter from '@modules/ecoleta/points/infra/http/routes';

const ecoletaRouter = Router();

ecoletaRouter.use('/items', itemsRouter);
ecoletaRouter.use('/points', pointsRouter);

export default ecoletaRouter;
