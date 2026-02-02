import { Request, Response } from 'express';
import Booking from '../models/booking';

interface AuthRequest extends Request {
  user?: any;
}

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      customer: req.user.id,
    });
    await booking.populate(['customer', 'service']);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    const filter = req.user.role === 'customer' ? { customer: req.user.id } : {};
    const bookings = await Booking.find(filter).populate(['customer', 'service']);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate(['customer', 'service']);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};