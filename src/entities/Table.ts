// src/entities/Table.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './Reservation';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  number!: number; // table number

  @Column()
  seats!: number; // number of seats

  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations!: Reservation[];
}
