import { Router } from 'express';
import { BookingController } from '../controllers/BookingController';
import { isLoggedIn } from '../middleware.ts/isLoggedIn';
import { isRenter } from '../middleware.ts/isRenter';

const router = Router();

router.post('/', isLoggedIn, isRenter, BookingController.bookProperty);
router.delete('/:bookingId', isLoggedIn, isRenter, BookingController.cancelBooking);
router.get('/', isLoggedIn, isRenter, BookingController.listMyBookings);


router.get('/:bookingId/status', BookingController.getBookingStatus);
router.put('/confirm/:bookingId', BookingController.confirmBooking);
router.put('/reject/:bookingId', BookingController.rejectBooking);
router.put('/cancel/:bookingId', BookingController.cancelBooking);

router.get("/their", BookingController.listBookingsOnMyProperties);

export default router;
