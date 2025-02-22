import { Router } from "express";
import { BookingController } from "../controllers/BookingController";
import { isLoggedIn } from "../middleware.ts/isLoggedIn";
import { isRenter } from "../middleware.ts/isRenter";

const router = Router();

router.post("/", isLoggedIn, isRenter, BookingController.bookProperty);
router.delete(
  "/:bookingId",
  isLoggedIn,
  isRenter,
  BookingController.cancelBooking
);
router.get("/", isLoggedIn, isRenter, BookingController.listMyBookings);

router.get(
  "/:bookingId/status",
  isLoggedIn,
  BookingController.getBookingStatus
);
router.put("/confirm/:bookingId", isLoggedIn, BookingController.confirmBooking);
router.put("/reject/:bookingId", isLoggedIn, BookingController.rejectBooking);
router.put("/cancel/:bookingId", isLoggedIn, BookingController.cancelBooking);

router.get('/:bookingId/status',isLoggedIn, BookingController.getBookingStatus);
router.put('/confirm/:bookingId', isLoggedIn, BookingController.confirmBooking);
router.put('/reject/:bookingId', isLoggedIn, BookingController.rejectBooking);
router.put('/cancel/:bookingId', isLoggedIn, isRenter, BookingController.cancelBooking);

router.get("/their-bookings", isLoggedIn, BookingController.listBookingsOnMyProperties);
router.get("/their", isLoggedIn, BookingController.listBookingsOnMyProperties);

export default router;
