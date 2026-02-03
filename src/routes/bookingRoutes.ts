import express from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/bookingController';
import { auth } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { createBookingSchema, updateBookingStatusSchema } from '../validation/booking';

const router = express.Router();

/**
 * @openapi
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get bookings for the current user (or all for owners)
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 * /api/bookings/{id}/status:
 *   put:
 *     summary: Update booking status (owner) or cancel (customer)
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.post('/', auth, validateBody(createBookingSchema), createBooking);
router.get('/', auth, getBookings);
router.put('/:id/status', auth, validateBody(updateBookingStatusSchema), updateBookingStatus);

export default router;
