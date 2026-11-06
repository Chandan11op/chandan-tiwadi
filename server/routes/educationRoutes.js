import express from 'express';
import {
  getPublicEducation,
  getAdminEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPublicEducation);
router.get('/all', requireAuth, getAdminEducation);
router.post('/', requireAuth, createEducation);
router.put('/:id', requireAuth, updateEducation);
router.delete('/:id', requireAuth, deleteEducation);

export default router;

