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
 *     responses:
 *       200:
 *         description: List of active salons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Salon'
 *   post:
 *     summary: Create a salon (owner only)
 *     tags:
 *       - Salons
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
 *               - phone
 *               - email
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Beauty Palace"
 *               description:
 *                 type: string
 *                 example: "Premium beauty salon"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "info@beautypalace.com"
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *               openingHours:
 *                 type: array
 *                 items:
 *                   type: object
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Salon created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Owner access required
 * 
 * /api/salons/{id}:
 *   get:
 *     summary: Get salon by id
 *     tags:
 *       - Salons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Salon ID
 *     responses:
 *       200:
 *         description: Salon details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Salon'
 *       404:
 *         description: Salon not found
 *   put:
 *     summary: Update a salon (owner only)
 *     tags:
 *       - Salons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Salon ID
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
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: object
 *               openingHours:
 *                 type: array
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Salon updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Owner access required
 *       404:
 *         description: Salon not found
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
 *         schema:
 *           type: string
 *         description: Salon ID
 *     responses:
 *       200:
 *         description: Salon deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Owner access required
 *       404:
 *         description: Salon not found
 */
router.get('/', getSalons);
router.get('/:id', getSalonById);
router.post('/', auth, ownerOnly, validateBody(createSalonSchema), createSalon);
router.put('/:id', auth, ownerOnly, validateBody(updateSalonSchema), updateSalon);
router.delete('/:id', auth, ownerOnly, deleteSalon);

export default router;