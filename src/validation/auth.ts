import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const signupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['customer', 'owner']).optional(),
});

export const verifyOtpSchema = z.object({
    email: z.string().email(),
    otpEntered: z.string().length(4),
});

export const resendOtpSchema = z.object({
    email: z.string().email(),
});

export const requestPasswordResetSchema = z.object({
    email: z.string().email(),
});

export const resetPasswordSchema = z.object({
    email: z.string().email(),
    code: z.string().length(4),
    newPassword: z.string().min(6),
});
