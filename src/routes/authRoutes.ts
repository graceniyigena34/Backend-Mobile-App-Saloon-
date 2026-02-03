import { Router } from 'express';
import * as authCtrl from '../controllers/authController';
import { auth, ownerOnly } from '../middleware/auth';

const router = Router();

// --- UI FLOW ROUTES ---
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthLoginResponse'
 * /api/auth/signup:
 *   post:
 *     summary: Sign up (register)
 *     tags:
 *       - Auth
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags:
 *       - Auth
 * /api/auth/resend-otp:
 *   post:
 *     summary: Resend OTP
 *     tags:
 *       - Auth
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags:
 *       - Auth
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags:
 *       - Auth
 */
router.post('/login', authCtrl.login);               // Screen 1
router.post('/signup', authCtrl.signup);             // Screen 2
router.post('/verify-otp', authCtrl.verifyOtp);       // Screen 6
router.post('/resend-otp', authCtrl.resendOtp);
router.post('/forgot-password', authCtrl.requestPasswordReset); // Screen 9
router.post('/reset-password', authCtrl.resetPassword);

// --- USER MANAGEMENT ROUTES ---
router.get('/me', auth, async (req, res) => { /* logic from your previous file */ });
router.get('/users', auth, ownerOnly, async (req, res) => { /* logic from your previous file */ });
router.put('/users/:id', auth, async (req, res) => { /* logic from your previous file */ });
router.delete('/users/:id', auth, async (req, res) => { /* logic from your previous file */ });

export default router;
