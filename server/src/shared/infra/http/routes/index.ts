import { Router } from 'express';

import aircncRouter from '@shared/infra/http/routes/modules/aircnc.routes';
import tindevRouter from '@shared/infra/http/routes/modules/tindev.routes';
import devRadarRouter from '@shared/infra/http/routes/modules/devradar.routes';
import thebeheroRouter from '@shared/infra/http/routes/modules/thebehero.routes';
import ecoletaRouter from '@shared/infra/http/routes/modules/ecoleta.routes';

const routes = Router();

routes.use('/aircnc', aircncRouter);
routes.use('/tindev', tindevRouter);
routes.use('/devradar', devRadarRouter);
routes.use('/thebehero', thebeheroRouter);
routes.use('/ecoleta', ecoletaRouter);

export default routes;
