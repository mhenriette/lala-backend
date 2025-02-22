import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Property } from "./property";
import { User } from "./user";

export enum Status {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  REJECTED = "rejected",
  CANCELED = "canceled",
}

@Entity()
export class Bookings extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Property, (property) => property.bookings)
  property: Property;

  @Column("timestamp")
  from: Date;

  @Column("timestamp")
  until: Date;

  @Column({ type: "enum", default: Status.PENDING, enum: Status })
  status: Status;

  @ManyToOne(() => User, (user) => user.properties, { nullable: true })
  @JoinColumn({ name: "hostId" })
  renter: User;
}
