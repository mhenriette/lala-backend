import { Bookings, Status } from "../database/entities/booking";
import { Property } from "../database/entities/property";
import { User } from "../database/entities/user";

export class BookingService {
  static async bookProperty(property: Property, renter: User, start: string, to: string) {
    const from = new Date(start)
    const until = new Date(to)
    const newBooking = new Bookings();
    newBooking.property = property;
    newBooking.renter = renter;
    newBooking.from = from;
    newBooking.until = until;
    await newBooking.save();
  }

  static async listMyProperty(user: User) {
    return await Property.find({
      where: {
        host: {
          id: user.id,
        },
      },
    });
  }

  static async updateBookingStatus(booking: Bookings, status: Status) {
    booking.status = status;
    return await booking.save();
  }
}
