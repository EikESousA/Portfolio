import { Router } from 'express';

import aircncRouter from '@shared/infra/http/routes/modules/aircnc.routes';
import tindevRouter from '@shared/infra/http/routes/modules/tindev.routes';
import devRadarRouter from '@shared/infra/http/routes/modules/devradar.routes';

const routes = Router();

routes.use('/aircnc', aircncRouter);
routes.use('/tindev', tindevRouter);
routes.use('/devradar', devRadarRouter);

export default routes;
