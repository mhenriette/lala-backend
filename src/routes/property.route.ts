import { Router } from 'express';
import PropertyController from '../controllers/PropertyController';

const router = Router();

router.post('/properties', PropertyController.createProperty);

export default router;
