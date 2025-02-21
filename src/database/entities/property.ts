import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
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
  
  
}
