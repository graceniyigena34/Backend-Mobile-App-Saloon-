import { Request, Response } from 'express';
import Service from '../models/service';
import Salon from '../models/salon';

export const getServices = async (req: Request, res: Response) => {
  try {
    const filter: any = { isActive: true };
    if (req.query.salon) {
      filter.salon = req.query.salon;
    }
    const services = await Service.find(filter);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const salon = await Salon.findById(req.body.salon);
    if (!salon) {
      return res.status(400).json({ message: 'Invalid salon' });
    }
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    await Service.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
