
import express from 'express';

import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/postController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', authMiddleware, createPost);

router.put('/:id', authMiddleware, updatePost);

router.delete('/:id', authMiddleware, deletePost);

export default router;

