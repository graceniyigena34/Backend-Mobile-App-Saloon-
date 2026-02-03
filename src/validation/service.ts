import { z } from 'zod';
import { objectIdSchema } from './common';

export const createServiceSchema = z
  .object({
    name: z.string().min(2),
    description: z.string().min(5),
    duration: z.number().int().positive(),
    price: z.number().nonnegative(),
    category: z.string().min(2),
    salon: objectIdSchema,
    isActive: z.boolean().optional(),
  })
  .strict();

export const updateServiceSchema = createServiceSchema.partial().strict();
