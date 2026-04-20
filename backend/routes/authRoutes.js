import express from 'express';
import { login, logout, verifyAuth } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', authMiddleware, verifyAuth);

export default router;
