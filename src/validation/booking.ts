import { z } from 'zod';
import { objectIdSchema, timeSchema, dateSchema } from './common';

export const createBookingSchema = z
  .object({
    service: objectIdSchema,
    date: dateSchema,
    time: timeSchema,
    notes: z.string().max(1000).optional(),
  })
  .strict();

export const updateBookingStatusSchema = z
  .object({
    status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  })
  .strict();
