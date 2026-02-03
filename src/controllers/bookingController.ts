import { Request, Response } from 'express';
import Booking from '../models/booking';
import Notification from '../models/notification';
import Salon from '../models/salon';
import Service from '../models/service';
import User from '../models/user';
import { sendEmail } from '../utils/email';

interface AuthRequest extends Request {
  user?: any;
}

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const service = await Service.findById(req.body.service);
    if (!service) {
      return res.status(400).json({ message: 'Invalid service' });
    }
    const salonId = service.salon;
    const booking = await Booking.create({
      ...req.body,
      salon: salonId,
      customer: req.user.id,
    });
    await booking.populate(['customer', 'service', 'salon']);

    const customerUser = await User.findById(req.user.id);
    if (customerUser) {
      await Notification.create({
        user: customerUser._id,
        title: 'Booking created',
        message: 'Your booking request has been created.',
        type: 'booking',
        metadata: { bookingId: booking._id },
      });
      await sendEmail(
        customerUser.email,
        'Booking created',
        'Your booking request has been created. We will notify you when it is confirmed.'
      );
    }

    if (salonId) {
      const salon = await Salon.findById(salonId);
      if (salon) {
        const ownerUser = await User.findById(salon.owner);
        if (ownerUser) {
          await Notification.create({
            user: ownerUser._id,
            title: 'New booking request',
            message: 'You have a new booking request.',
            type: 'booking',
            metadata: { bookingId: booking._id },
          });
          await sendEmail(
            ownerUser.email,
            'New booking request',
            'You have a new booking request. Please review it in your dashboard.'
          );
        }
      }
    }

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

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const isOwner = req.user?.role === 'owner';
    const isCustomer = req.user?.role === 'customer';

    if (isCustomer) {
      if (booking.customer.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      if (status !== 'cancelled') {
        return res.status(403).json({ message: 'Customers can only cancel bookings' });
      }
    }

    if (!isOwner && !isCustomer) {
      return res.status(403).json({ message: 'Access denied' });
    }

    booking.status = status;
    await booking.save();
    await booking.populate(['customer', 'service', 'salon']);
    
    const customerUser = await User.findById(booking.customer);
    if (customerUser) {
      await Notification.create({
        user: customerUser._id,
        title: 'Booking status updated',
        message: `Your booking is now ${booking.status}.`,
        type: 'booking',
        metadata: { bookingId: booking._id },
      });
      await sendEmail(
        customerUser.email,
        'Booking status updated',
        `Your booking is now ${booking.status}.`
      );
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
