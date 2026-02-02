import express from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/bookingController';
import { auth, ownerOnly } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/', auth, getBookings);
router.put('/:id/status', auth, ownerOnly, updateBookingStatus);

export default router;