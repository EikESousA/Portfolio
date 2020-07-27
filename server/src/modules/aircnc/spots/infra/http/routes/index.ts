import { Router } from 'express';
import multer from 'multer';

import DashboardController from '@modules/aircnc/spots/infra/http/controllers/DashboardController';
import SpotController from '@modules/aircnc/spots/infra/http/controllers/SpotController';

import uploadConfig from '@config/upload';

const spotsRouter = Router();
const upload = multer(uploadConfig.multer);

const dashboardController = new DashboardController();
const spotController = new SpotController();

spotsRouter.get('/', spotController.index);
spotsRouter.post('/', upload.single('thumbnail'), spotController.store);
spotsRouter.get('/dashboard', dashboardController.show);

export default spotsRouter;
