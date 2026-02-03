import express from 'express';
import { auth } from '../middleware/auth';
import { getMyNotifications, markAllAsRead, markAsRead } from '../controllers/notificationController';

const router = express.Router();

/**
 * @openapi
 * /api/notifications:
 *   get:
 *     summary: Get my notifications
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 * /api/notifications/read-all:
 *   put:
 *     summary: Mark all notifications as read
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 */
router.get('/', auth, getMyNotifications);
router.put('/:id/read', auth, markAsRead);
router.put('/read-all', auth, markAllAsRead);

export default router;
