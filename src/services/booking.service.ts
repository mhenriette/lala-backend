import { Bookings } from "../database/entities/booking";
import { Property } from "../database/entities/property";
import { User } from "../database/entities/user";

export class BookingService {
  static async bookProperty(property: Property, renter: User) {
    const newBooking = new Bookings();
    newBooking.property = property;
    newBooking.renter = renter;
    await newBooking.save();
  }

  static async cancelBooking(booking: Bookings) {
    booking.status = false;
    await booking.save();
  }
}