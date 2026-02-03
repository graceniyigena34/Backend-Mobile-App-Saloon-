import { Request, Response } from 'express';
import Salon from '../models/salon';

interface AuthRequest extends Request {
  user?: any;
}

export const getSalons = async (_req: Request, res: Response) => {
  try {
    const salons = await Salon.find({ isActive: true }).populate('services');
    res.json(salons);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSalonById = async (req: Request, res: Response) => {
  try {
    const salon = await Salon.findById(req.params.id).populate('services');
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }
    res.json(salon);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createSalon = async (req: AuthRequest, res: Response) => {
  try {
    const salon = await Salon.create({
      ...req.body,
      owner: req.user.id,
    });
    res.status(201).json(salon);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateSalon = async (req: AuthRequest, res: Response) => {
  try {
    const salon = await Salon.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }
    res.json(salon);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteSalon = async (req: AuthRequest, res: Response) => {
  try {
    const salon = await Salon.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { isActive: false },
      { new: true }
    );
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }
    res.json({ message: 'Salon deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
