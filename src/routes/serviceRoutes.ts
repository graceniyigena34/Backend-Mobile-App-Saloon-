import express from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController';
import { auth, ownerOnly } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { createServiceSchema, updateServiceSchema } from '../validation/service';

const router = express.Router();

/**
 * @openapi
 * /api/services:
 *   get:
 *     summary: List active services (optional salon filter)
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: salon
 *         required: false
 *         schema:
 *           type: string
 *   post:
 *     summary: Create a service (owner only)
 *     tags:
 *       - Services
 *     security:
 *       - bearerAuth: []
 * /api/services/{id}:
 *   put:
 *     summary: Update a service (owner only)
 *     tags:
 *       - Services
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete a service (owner only)
 *     tags:
 *       - Services
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.get('/', getServices);
router.post('/', auth, ownerOnly, validateBody(createServiceSchema), createService);
router.put('/:id', auth, ownerOnly, validateBody(updateServiceSchema), updateService);
router.delete('/:id', auth, ownerOnly, deleteService);

export default router;
