import { Router } from 'express';
import { BookingController } from '../controllers/BookingController';

const router = Router();

router.post('/', BookingController.bookProperty);
router.delete('/:bookingId', BookingController.cancelBooking);
router.get('/', BookingController.listMyBookings);


router.get('/:bookingId/status', BookingController.getBookingStatus);
router.put('/confirm/:bookingId', BookingController.confirmBooking);
router.put('/reject/:bookingId', BookingController.rejectBooking);
router.put('/cancel/:bookingId', BookingController.cancelBooking);

export default router;
