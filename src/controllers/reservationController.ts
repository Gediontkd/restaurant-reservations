import { Request, Response } from 'express';
import { getRepository, Between } from 'typeorm';
import { Reservation } from '../entities/Reservation';
import { User } from '../entities/User';
import { Table } from '../entities/Table';
import validator from 'validator';

// create reservation
export const createReservation = async (req: Request, res: Response) => {
  const { email, date, time, tableNumber } = req.body;

  try {
    // validate user email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // check if the user exists based on the provided email
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // parse date and time to create startTime and endTime
    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);

    // check if the reservation time is within restaurant opening hours (19:00 - 24:00)
    const openingTime = new Date(startDateTime);
    openingTime.setHours(19, 0, 0, 0);

    const closingTime = new Date(startDateTime);
    closingTime.setHours(23, 59, 59, 999);

    if (startDateTime < openingTime || endDateTime > closingTime) {
      return res.status(400).json({ error: 'Reservation outside of restaurant opening hours' });
    }

    // retrieve the specified table
    const tableRepository = getRepository(Table);
    const table = await tableRepository.findOne({ where: { number: tableNumber } });

    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    // check if the specified table is available for the given time
    const conflictingReservations = await getRepository(Reservation)
      .createQueryBuilder('reservation')
      .where('reservation.tableId = :tableId', { tableId: table.id })
      .andWhere('reservation.startTime < :endDateTime AND reservation.endTime > :startDateTime', {
        startDateTime,
        endDateTime,
      })
      .getOne();

    if (conflictingReservations) {
      return res.status(400).json({ error: 'Table is already reserved for the selected time' });
    }

    // create reservation
    const reservationRepository = getRepository(Reservation);
    const reservation = reservationRepository.create({
      startTime: startDateTime,
      endTime: endDateTime,
      user: user,
      table: table,
    });

    await reservationRepository.save(reservation);

    return res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return res.status(500).json({ error: `Error creating reservation: ${(error as Error).message}` });
  }
};

// Get reservations with pagination
export const getReservations = async (req: Request, res: Response) => {
  const { startDate, endDate, page = 1, limit = 10 } = req.query;

  // input validation
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Both startDate and endDate parameters are required' });
  }

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);
  const skip = (pageNumber - 1) * pageSize;

  try {
    const reservationRepository = getRepository(Reservation);

    const [reservations, total] = await reservationRepository.findAndCount({
      where: {
        startTime: Between(new Date(startDate as string), new Date(endDate as string)),
      },
      relations: ['user', 'table'],
      skip: skip,
      take: pageSize,
    });

    if (reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found in the specified date range' });
    }

    // map reservations to desired response format with adjusted endtime based on seating time
    const formattedReservations = reservations.map(reservation => {
      const startDateTime = new Date(reservation.startTime);
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 1); // add one hour for seating time

      return {
        id: reservation.id,
        startTime: reservation.startTime.toISOString(), // convert Date to ISO string
        endTime: endDateTime.toISOString(), // convert adjusted end time to ISO string
        user: {
          id: reservation.user.id,
          name: reservation.user.name,
          email: reservation.user.email,
        },
        table: {
          id: reservation.table.id,
          number: reservation.table.number,
          seats: reservation.table.seats,
        },
      };
    });

    return res.status(200).json({
      totalItems: total,
      totalPages: Math.ceil(total / pageSize),
      currentPage: pageNumber,
      reservations: formattedReservations,
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return res.status(500).json({ error: `Error fetching reservations: ${(error as Error).message}` });
  }
};
