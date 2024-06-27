import express from 'express';
import { createReservation, getReservations } from '../controllers/reservationController';

const router = express.Router();

router.post('/', createReservation);
router.get('/', getReservations);

export default router;
