import { Request, Response } from 'express';
import User from '../models/user';
import Booking from '../models/booking';
import Salon from '../models/salon';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalSalons = await Salon.countDocuments();
        const activeSalons = await Salon.countDocuments({ isActive: true });

        res.json({
            users: totalUsers,
            bookings: totalBookings,
            salons: {
                total: totalSalons,
                active: activeSalons
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
