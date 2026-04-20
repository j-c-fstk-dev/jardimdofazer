import express from 'express';
import { uploadProductImage, uploadPostImage } from '../controllers/uploadController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/product', authMiddleware, uploadProductImage);
router.post('/post', authMiddleware, uploadPostImage);

export default router;
