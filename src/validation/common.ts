import { z } from 'zod';

export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

export const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, 'Time must be HH:MM');

export const dateSchema = z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
  message: 'Invalid date',
});
