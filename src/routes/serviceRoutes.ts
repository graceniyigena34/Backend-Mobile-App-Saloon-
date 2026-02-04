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
 *         description: Filter services by salon ID
 *     responses:
 *       200:
 *         description: List of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *   post:
 *     summary: Create a service (owner only)
 *     tags:
 *       - Services
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - duration
 *               - price
 *               - salon
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hair Cut"
 *               description:
 *                 type: string
 *                 example: "Professional hair cutting service"
 *               duration:
 *                 type: number
 *                 example: 60
 *               price:
 *                 type: number
 *                 example: 25.99
 *               category:
 *                 type: string
 *                 example: "Hair"
 *               salon:
 *                 type: string
 *                 description: Salon ID
 *     responses:
 *       201:
 *         description: Service created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Owner access required
 * 
 * /api/services/{id}:
 *   put:
 *     summary: Update a service (owner only)
 *     tags:
 *       - Services
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Owner access required
 *       404:
 *         description: Service not found
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
 *         schema:
 *           type: string
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Owner access required
 *       404:
 *         description: Service not found
 */
router.get('/', getServices);
router.post('/', auth, ownerOnly, validateBody(createServiceSchema), createService);
router.put('/:id', auth, ownerOnly, validateBody(updateServiceSchema), updateService);
router.delete('/:id', auth, ownerOnly, deleteService);

export default router;