import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  LessThan,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Bookings, Status } from "./booking";
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

  @OneToMany(() => Bookings, (bookings) => bookings.property)
  bookings: Bookings;

  async isBooked(until: string): Promise<boolean> {
    const to = new Date(until);
    const booking = await Bookings.findOne({
      where: {
        property: {
          id: this.id,
        },
        status: Status.CONFIRMED,
        until: LessThan(to),
      },
    });

    return !!booking;
  }
}