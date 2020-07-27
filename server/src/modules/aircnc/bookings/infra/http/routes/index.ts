import { Router } from 'express';

import BookingsController from '@modules/aircnc/bookings/infra/http/controllers/BookingsController';
import ApprovalBookingController from '@modules/aircnc/bookings/infra/http/controllers/ApprovalBookingController';
import RejectionBookingController from '@modules/aircnc/bookings/infra/http/controllers/RejectionBookingController';

const bookingsRouter = Router();

const bookingsController = new BookingsController();
const approvalBookingController = new ApprovalBookingController();
const rejectionBookingController = new RejectionBookingController();

bookingsRouter.post('/:spot_id/creates', bookingsController.store);
bookingsRouter.post('/:booking_id/approvals', approvalBookingController.store);
bookingsRouter.post(
  '/:booking_id/rejections',
  rejectionBookingController.store,
);

export default bookingsRouter;
