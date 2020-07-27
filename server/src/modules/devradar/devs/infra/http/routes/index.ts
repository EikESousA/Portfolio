import { Router } from 'express';

import DevController from '@modules/devradar/devs/infra/http/controllers/DevController';
import SearchController from '@modules/devradar/devs/infra/http/controllers/SearchController';

const devRouter = Router();

const devController = new DevController();
const searchController = new SearchController();

devRouter.post('/', devController.store);
devRouter.get('/', devController.index);
devRouter.get('/search', searchController.index);

export default devRouter;
