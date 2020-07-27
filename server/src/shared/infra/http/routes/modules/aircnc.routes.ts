import { Router } from 'express';

import spotsRouter from '@modules/aircnc/spots/infra/http/routes';
import usersRouter from '@modules/aircnc/users/infra/http/routes';
import bookingsRouter from '@modules/aircnc/bookings/infra/http/routes';

const aircncRouter = Router();

aircncRouter.use('/spots', spotsRouter);
aircncRouter.use('/sessions', usersRouter);
aircncRouter.use('/bookings', bookingsRouter);

export default aircncRouter;
