import { Router } from 'express';

import DevController from '@modules/tindev/devs/infra/http/controllers/DevController';
import LikeController from '@modules/tindev/devs/infra/http/controllers/LikeController';
import DislikeController from '@modules/tindev/devs/infra/http/controllers/DislikeController';

const devRouter = Router();

const devController = new DevController();
const likeController = new LikeController();
const dislikeController = new DislikeController();

devRouter.get('/', devController.index);
devRouter.post('/', devController.store);
devRouter.post('/:dev_id/likes', likeController.store);
devRouter.post('/:dev_id/dislikes', dislikeController.store);

export default devRouter;
