import express from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController';
import { auth, ownerOnly } from '../middleware/auth';

const router = express.Router();

router.get('/', getServices);
router.post('/', auth, ownerOnly, createService);
router.put('/:id', auth, ownerOnly, updateService);
router.delete('/:id', auth, ownerOnly, deleteService);

export default router;