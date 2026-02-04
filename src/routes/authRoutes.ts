import { Router } from 'express';
import * as authCtrl from '../controllers/authController';
import { auth, ownerOnly } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import * as authSchemas from '../validation/auth';

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: grace@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', validateBody(authSchemas.loginSchema), authCtrl.login);
router.post('/signup', validateBody(authSchemas.signupSchema), authCtrl.signup);

router.post('/verify-otp', validateBody(authSchemas.verifyOtpSchema), authCtrl.verifyOtp);

router.post('/resend-otp', validateBody(authSchemas.resendOtpSchema), authCtrl.resendOtp);
router.post('/forgot-password', validateBody(authSchemas.requestPasswordResetSchema), authCtrl.requestPasswordReset);
router.post('/reset-password', validateBody(authSchemas.resetPasswordSchema), authCtrl.resetPassword);

router.get('/me', auth, async (req, res) => { /* logic */ });
router.get('/users', auth, ownerOnly, async (req, res) => { /* logic */ });
router.put('/users/:id', auth, async (req, res) => { /* logic */ });
router.delete('/users/:id', auth, async (req, res) => { /* logic */ });

export default router;