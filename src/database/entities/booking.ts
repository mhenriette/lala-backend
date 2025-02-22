import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Property } from "./property";
import { User } from "./user";

@Entity()
export class Bookings extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Property, (property) => property.bookings)
  property: Property

  @Column("timestamp")
  from: Date;

  @Column("timestamp")
  until: Date;

  @Column("boolean", { default: true  })
  status: Boolean

  @ManyToOne(() => User, (user) => user.properties, { nullable: true })
  @JoinColumn({ name: "hostId" })
  renter: User;
}