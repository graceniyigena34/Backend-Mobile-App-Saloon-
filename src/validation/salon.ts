import { z } from 'zod';
import { objectIdSchema } from './common';

const openingHoursSchema = z.object({
  day: z.string().min(1),
  open: z.string().min(1),
  close: z.string().min(1),
  isClosed: z.boolean().optional(),
});

const locationSchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([z.number(), z.number()]),
});

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

export const createSalonSchema = z
  .object({
    name: z.string().min(2),
    description: z.string().max(2000).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: addressSchema.optional(),
    location: locationSchema.optional(),
    openingHours: z.array(openingHoursSchema).optional(),
    services: z.array(objectIdSchema).optional(),
    images: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

export const updateSalonSchema = createSalonSchema.partial().strict();
