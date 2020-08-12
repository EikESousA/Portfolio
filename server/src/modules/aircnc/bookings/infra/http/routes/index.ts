import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import BookingsController from '@modules/aircnc/bookings/infra/http/controllers/BookingsController';
import ApprovalBookingController from '@modules/aircnc/bookings/infra/http/controllers/ApprovalBookingController';
import RejectionBookingController from '@modules/aircnc/bookings/infra/http/controllers/RejectionBookingController';

const bookingsRouter = Router();

const bookingsController = new BookingsController();
const approvalBookingController = new ApprovalBookingController();
const rejectionBookingController = new RejectionBookingController();

bookingsRouter.post(
  '/:spot_id/creates',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      spot_id: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object()
      .keys({
        user_id: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      date: Joi.string().required(),
    }),
  }),
  bookingsController.store,
);
bookingsRouter.post(
  '/:booking_id/approvals',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      booking_id: Joi.string().required(),
    }).unknown(),
  }),
  approvalBookingController.store,
);
bookingsRouter.post(
  '/:booking_id/rejections',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      booking_id: Joi.string().required(),
    }).unknown(),
  }),
  rejectionBookingController.store,
);

export default bookingsRouter;
