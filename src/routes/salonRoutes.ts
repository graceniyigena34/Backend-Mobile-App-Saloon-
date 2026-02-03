import express from 'express';
import { auth, ownerOnly } from '../middleware/auth';
import { createSalon, deleteSalon, getSalonById, getSalons, updateSalon } from '../controllers/salonController';
import { validateBody } from '../middleware/validate';
import { createSalonSchema, updateSalonSchema } from '../validation/salon';

const router = express.Router();

/**
 * @openapi
 * /api/salons:
 *   get:
 *     summary: List active salons
 *     tags:
 *       - Salons
 *   post:
 *     summary: Create a salon (owner only)
 *     tags:
 *       - Salons
 *     security:
 *       - bearerAuth: []
 * /api/salons/{id}:
 *   get:
 *     summary: Get salon by id
 *     tags:
 *       - Salons
 *   put:
 *     summary: Update a salon (owner only)
 *     tags:
 *       - Salons
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete a salon (owner only)
 *     tags:
 *       - Salons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.get('/', getSalons);
router.get('/:id', getSalonById);
router.post('/', auth, ownerOnly, validateBody(createSalonSchema), createSalon);
router.put('/:id', auth, ownerOnly, validateBody(updateSalonSchema), updateSalon);
router.delete('/:id', auth, ownerOnly, deleteSalon);

export default router;
