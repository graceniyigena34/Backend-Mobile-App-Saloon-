import express from 'express';
import { getDashboardStats, getAllUsers } from '../controllers/adminController';
import { auth, ownerOnly } from '../middleware/auth';

const router = express.Router();

/**
 * @openapi
 * /api/admin/dashboard:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get dashboard statistics (admin only)
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: number
 *                 bookings:
 *                   type: number
 *                 salons:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     active:
 *                       type: number
 *       403:
 *         description: Forbidden
 */
router.get('/dashboard', auth, ownerOnly, getDashboardStats);

/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users (admin only)
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden
 */
router.get('/users', auth, ownerOnly, getAllUsers);

export default router;
