import { Request, Response } from "express";
import { Bookings, Status } from "../database/entities/booking";
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
    const { propertyId, from, to } = request.body as {
      propertyId: string;
      from: string;
      to: string;
    };

    const authenticatedRequest = request as AuthenticatedRequest;
    const renterId = authenticatedRequest.user.id;

    if (!renterId) {
      response.status(400).json({
        message: "Renter is required.",
      });
      return;
    }

    const property = await Property.findOne({ where: { id: propertyId } });
    const renter = await User.findOne({ where: { id: renterId } });

    if (!property || !renter) {
      response.status(404).json({ message: "Property or renter not found" });
      return;
    }

    const isBooked = await property.isBooked(to);
    if (isBooked) {
      response.status(400).json({ message: "Property is already booked" });
      return;
    }

    await BookingService.bookProperty(property, renter, from, to);
    response.status(201).json({ message: "Booking successful" });
  }

  static async getBookingStatus(request: Request, response: Response) {
    const { bookingId } = request.params as { bookingId: string };
    const booking = await Bookings.findOne({ where: { id: bookingId } });

    if (!booking) {
      response.status(404).json({ message: "Booking not found" });
      return;
    }

    response.status(200).json({ status: booking.status });
  }

  static async cancelBooking(request: Request, response: Response) {
    const { bookingId } = request.params as { bookingId: string };
    const booking = await Bookings.findOne({ where: { id: bookingId } });

    const authenticatedRequest = request as AuthenticatedRequest;
    const user = authenticatedRequest.user;

    if (!booking) {
      response.status(404).json({ message: "Booking not found" });
      return;
    }

    const isBookingOwner = user.id === booking.renter.id
    
    if (!isBookingOwner) {
      response.status(404).json({ message: "You need to be the owner of this booking to cancel." });
      return;
    }

    await BookingService.updateBookingStatus(booking, Status.CANCELED);
    response.status(200).json({ message: "Booking cancelled" });
  }

  static async rejectBooking(request: Request, response: Response) {
    const { bookingId } = request.params as { bookingId: string };
    const booking = await Bookings.findOne({ where: { id: bookingId } });
    const authenticatedRequest = request as AuthenticatedRequest;
    const user = authenticatedRequest.user;
    

    if (!booking) {
      response.status(404).json({ message: "Booking not found" });
      return;
    }
    
    const isPropertyOwner = user.id === booking?.property.id;
    if (!isPropertyOwner) {
      response.status(404).json({ message: "You need to be the owner of the property to confirm or reject a booking." });
      return;
    }

    await BookingService.updateBookingStatus(booking, Status.REJECTED);
    response.status(200).json({ message: "Booking cancelled" });
  }

  static async confirmBooking(request: Request, response: Response) {
    const { bookingId } = request.params as { bookingId: string };
    const booking = await Bookings.findOne({ where: { id: bookingId } });
    const authenticatedRequest = request as AuthenticatedRequest;
    const user = authenticatedRequest.user;

    
    if (!booking) {
      response.status(404).json({ message: "Booking not found" });
      return;
    }
    
    const isPropertyOwner = user.id === booking?.property.id;
    if (!isPropertyOwner) {
      response.status(404).json({ message: "You need to be the owner to confirm or reject a booking." });
      return;
    }

    await BookingService.updateBookingStatus(booking, Status.CONFIRMED);
    response.status(200).json({ message: "Booking cancelled" });
  }

  static async listMyBookings(request: Request, response: Response) {
    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;
    const bookings = await Bookings.find({ where: { renter: { id: userId } } });
    response.status(200).json(bookings);
    return;
  }
  static async listBookingsOnMyProperties(
    request: Request,
    response: Response
  ) {
    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;
    const bookings = await Bookings.find({
      select: ["property"],
      where: {
        property: {
          host: {
            id: userId,
          },
        },
      },
    });
    response.status(200).json(bookings);
    return;
  }
}
