import { describe, expect, it } from 'vitest';
import { createBookingSchema, updateBookingStatusSchema } from '../src/validation/booking';
import { createSalonSchema } from '../src/validation/salon';
import { createServiceSchema } from '../src/validation/service';

describe('Validation schemas', () => {
  it('accepts valid booking payload', () => {
    const result = createBookingSchema.safeParse({
      service: '507f1f77bcf86cd799439011',
      date: new Date().toISOString(),
      time: '10:30',
      notes: 'Please be on time',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid booking time', () => {
    const result = createBookingSchema.safeParse({
      service: '507f1f77bcf86cd799439011',
      date: new Date().toISOString(),
      time: '10-30',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid booking status update', () => {
    const result = updateBookingStatusSchema.safeParse({
      status: 'approved',
    });
    expect(result.success).toBe(false);
  });

  it('accepts valid salon payload', () => {
    const result = createSalonSchema.safeParse({
      name: 'Grace Mobile Salon',
      email: 'owner@example.com',
      address: { city: 'Austin', state: 'TX' },
      openingHours: [{ day: 'Mon', open: '09:00', close: '17:00' }],
    });
    expect(result.success).toBe(true);
  });

  it('requires salon for service', () => {
    const result = createServiceSchema.safeParse({
      name: 'Braids',
      description: 'Classic braids',
      duration: 60,
      price: 80,
      category: 'Hair',
    });
    expect(result.success).toBe(false);
  });
});
