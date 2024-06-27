import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './Reservation';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations!: Reservation[];

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
