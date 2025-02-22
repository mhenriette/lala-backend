import { Router } from 'express';
import PropertyController from '../controllers/PropertyController';

const router = Router();

router.post('/', PropertyController.createProperty);
router.get('/', PropertyController.listProperties);


export default router;
