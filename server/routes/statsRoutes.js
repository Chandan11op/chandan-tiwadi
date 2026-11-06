import express from 'express';
import { getDashboardStats } from '../controllers/statsController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, getDashboardStats);

export default router;

