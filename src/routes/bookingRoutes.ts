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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service
 *               - date
 *               - time
 *             properties:
 *               service:
 *                 type: string
 *                 description: Service ID
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:00:00.000Z"
 *               time:
 *                 type: string
 *                 example: "10:00"
 *               notes:
 *                 type: string
 *                 example: "Please call before arriving"
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid service or validation error
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get bookings for the current user (or all for owners)
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 * 
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
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, completed, cancelled]
 *                 example: "confirmed"
 *     responses:
 *       200:
 *         description: Booking status updated
 *       400:
 *         description: Invalid status
 *       403:
 *         description: Access denied
 *       404:
 *         description: Booking not found
 */
router.post('/', auth, validateBody(createBookingSchema), createBooking);
router.get('/', auth, getBookings);
router.put('/:id/status', auth, validateBody(updateBookingStatusSchema), updateBookingStatus);

export default router;