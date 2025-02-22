import { Router } from 'express';
import { BookingController } from '../controllers/BookingController';

const router = Router();

router.post('/', BookingController.bookProperty);
router.delete('/:bookingId', BookingController.cancelBooking);
router.get('/', BookingController.listMyBookings);

export default router;