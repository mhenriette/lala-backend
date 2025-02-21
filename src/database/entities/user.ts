import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Property } from "./property";

export enum UserRole {
  HOST = "HOST",
  RENTER = "RENTER",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  profilePictureUrl: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.RENTER })
  role: UserRole;

  @OneToMany(() => Property, (property) => property.host)
  properties: Property[];
  
  
}
