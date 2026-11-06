import express from 'express';
import { uploadMedia, deleteMedia } from '../controllers/uploadController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { uploadImage, uploadDocument } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/image', requireAuth, uploadImage.single('file'), uploadMedia);
router.post('/document', requireAuth, uploadDocument.single('file'), uploadMedia);
router.delete('/:public_id', requireAuth, deleteMedia);

export default router;

