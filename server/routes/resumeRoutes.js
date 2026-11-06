import express from 'express';
import {
  getPublicActiveResume,
  getAdminResumes,
  createResume,
  setActiveResume,
  deleteResume,
} from '../controllers/resumeController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/active', getPublicActiveResume);
router.get('/all', requireAuth, getAdminResumes);
router.post('/', requireAuth, createResume);
router.put('/:id/active', requireAuth, setActiveResume);
router.delete('/:id', requireAuth, deleteResume);

export default router;

