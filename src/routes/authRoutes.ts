import { Router } from 'express';
import * as authCtrl from '../controllers/authController';
import { auth, ownerOnly } from '../middleware/auth';

const router = Router();

// --- UI FLOW ROUTES ---
router.post('/login', authCtrl.login);               // Screen 1
router.post('/signup', authCtrl.signup);             // Screen 2
router.post('/verify-otp', authCtrl.verifyOtp);       // Screen 6
router.post('/forgot-password', authCtrl.requestPasswordReset); // Screen 9
router.post('/reset-password', authCtrl.resetPassword);

// --- USER MANAGEMENT ROUTES ---
router.get('/me', auth, async (req, res) => { /* logic from your previous file */ });
router.get('/users', auth, ownerOnly, async (req, res) => { /* logic from your previous file */ });
router.put('/users/:id', auth, async (req, res) => { /* logic from your previous file */ });
router.delete('/users/:id', auth, async (req, res) => { /* logic from your previous file */ });

export default router;