import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { sendEmail } from '../utils/email';

const createToken = (user: any) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );
};

// Screen 2: SIGNUP
export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // For Screen 6

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'customer',
            otp, 
            isVerified: false
        });

        const sent = await sendEmail(
            user.email,
            'Your verification code',
            `Your verification code is ${otp}`
        );

        const response: any = { message: "Verify your phone", email: user.email, otpSent: sent };
        if (!sent) {
            response.otp = otp;
        }
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Screen: LOGIN
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify OTP', requiresOtp: true });
        }

        const token = createToken(user);
        res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Screen: VERIFY OTP
export const verifyOtp = async (req: Request, res: Response) => {
    const { email, otpEntered } = req.body;
    const user = await User.findOne({ email });

    if (user && user.otp === otpEntered) {
        user.isVerified = true;
        user.otp = undefined;
        await user.save();
        const token = createToken(user);
        return res.json({ message: "Verified", token });
    }
    res.status(400).json({ message: "Invalid code" });
};

export const resendOtp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.otp = otp;
        await user.save();

        const sent = await sendEmail(
            user.email,
            'Your verification code',
            `Your verification code is ${otp}`
        );

        const response: any = { message: "OTP resent", otpSent: sent };
        if (!sent) {
            response.otp = otp;
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Screen: FORGOT PASSWORD
export const requestPasswordReset = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.resetToken = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetTokenExpires = new Date(Date.now() + 600000); 
    await user.save();

    const sent = await sendEmail(
        user.email,
        'Your password reset code',
        `Your password reset code is ${user.resetToken}`
    );

    const response: any = { message: "Code has been sent!", resetSent: sent };
    if (!sent) {
        response.code = user.resetToken;
    }
    res.json(response); // Screen 10
};

// Final Step: RESET PASSWORD 
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, code, newPassword } = req.body;

        // Find user with valid, non-expired token
        const user = await User.findOne({
            email,
            resetToken: code,
            resetTokenExpires: { $gt: new Date() } // Check if code is still valid
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset code" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        user.password = hashedPassword;
        user.resetToken = undefined; // Clear token so it can't be used again
        user.resetTokenExpires = undefined;
        
        await user.save();

        res.json({ message: "Password updated successfully! You can now login." });
    } catch (error) {
        res.status(500).json({ message: "Server error during password reset" });
    }
};
