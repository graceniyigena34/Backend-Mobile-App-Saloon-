import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/test:
 *   post:
 *     tags:
 *       - Test
 *     summary: Test endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test Name"
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', (req, res) => {
  res.json({ message: 'Test successful' });
});

export default router;