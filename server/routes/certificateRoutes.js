import express from 'express';
import {
  getPublicCertificates,
  getAdminCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from '../controllers/certificateController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPublicCertificates);
router.get('/all', requireAuth, getAdminCertificates);
router.get('/:id', getCertificateById);
router.post('/', requireAuth, createCertificate);
router.put('/:id', requireAuth, updateCertificate);
router.delete('/:id', requireAuth, deleteCertificate);

export default router;

