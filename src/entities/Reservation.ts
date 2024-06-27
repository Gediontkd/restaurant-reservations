import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from './User';
import { Table } from './Table';
import { getRepository } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'datetime' })
  startTime!: Date;

  @Column({ type: 'datetime' })
  endTime!: Date;

  @ManyToOne(() => User, user => user.reservations, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Table, table => table.reservations, { nullable: false })
  @JoinColumn({ name: 'tableId' })
  table!: Table;

  // check for overbooking before inserting or updating a reservation
  @BeforeInsert()
  @BeforeUpdate()
  async checkForOverbooking() {
    const reservationRepository = getRepository(Reservation);

    const existingReservation = await reservationRepository.findOne({
      where: {
        table: this.table,
        startTime: this.startTime,
        endTime: this.endTime,
      }
    });

    if (existingReservation) {
      throw new Error(`Table ${this.table.id} is already booked for the selected time.`);
    }
  }
}
