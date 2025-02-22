import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  LessThan,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bookings } from "./booking";
import { User } from "./user";

@Entity()
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  pricePerNight: number;

  @Column()
  location: string;

  @Column()
  hostId: string;

  @ManyToOne(() => User, (user) => user.properties, { nullable: true })
  @JoinColumn({ name: "hostId" })
  host: User;

  @OneToOne(() => Bookings, (bookings) => bookings.renter)
  bookings: Bookings;

  async isBooked(): Promise<boolean> {
    const now = new Date();
    const booking = await Bookings.findOne({
      where: {
        property: {
          id: this.id,
        },
        status: true,
        until: LessThan(now),
      },
    });

    return !!booking;
  }
}