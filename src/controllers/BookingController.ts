import { Request, Response } from "express";
import { Bookings } from "../database/entities/booking";
import { Property } from "../database/entities/property";
import { User } from "../database/entities/user";
import { BookingService } from "../services/booking.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

export class BookingController {
  static async bookProperty(request: Request, response: Response) {
    const { propertyId, renterId } = request.body as { propertyId: string; renterId: string };
    const property = await Property.findOne({ where: { id: propertyId } });
    const renter = await User.findOne({ where: { id: renterId } });

    if (!property || !renter) {
      response.status(404).json({ message: "Property or renter not found" });
      return
    }

    const isBooked = await property.isBooked();
    if (isBooked) {
      response.status(400).json({ message: "Property is already booked" });
      return
    }

    await BookingService.bookProperty(property, renter);
    response.status(201).json({ message: "Booking successful" });
  }

  static async cancelBooking(request: Request, response: Response) {
    const { bookingId } = request.params as { bookingId: string };
    const booking = await Bookings.findOne({ where: { id: bookingId } });

    if (!booking) {
      response.status(404).json({ message: "Booking not found" });
      return
    }

    await BookingService.cancelBooking(booking);
    response.status(200).json({ message: "Booking cancelled" });
  }

  static async listMyBookings(request: Request, response: Response) {
    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;
    const bookings = await Bookings.find({ where: { renter: { id: userId } } });
    response.status(200).json(bookings);
    return
  }
}