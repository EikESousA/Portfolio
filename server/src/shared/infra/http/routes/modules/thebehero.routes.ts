import { Router } from 'express';

import ongsRouter from '@modules/thebehero/ongs/infra/http/routes';
import incidentsRouter from '@modules/thebehero/incidents/infra/http/routes';

const theBeHeroRouter = Router();

theBeHeroRouter.use('/ongs', ongsRouter);
theBeHeroRouter.use('/incidents', incidentsRouter);

export default theBeHeroRouter;
