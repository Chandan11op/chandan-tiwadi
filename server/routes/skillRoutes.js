import express from 'express';
import {
  getPublicSkills,
  getAdminSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  deleteCategory,
} from '../controllers/skillController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPublicSkills);
router.get('/all', requireAuth, getAdminSkills);
router.post('/', requireAuth, createSkill);
router.put('/:id', requireAuth, updateSkill);
router.delete('/:id', requireAuth, deleteSkill);
router.delete('/category/:categoryName', requireAuth, deleteCategory);

export default router;

