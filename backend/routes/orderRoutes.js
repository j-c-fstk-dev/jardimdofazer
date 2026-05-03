
import express from 'express';

import { getOrders, getOrder, createOrder, updateOrderStatus } from '../controllers/orderController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getOrders);

router.get('/:id', authMiddleware, getOrder);

router.post('/', createOrder);

router.put('/:id', authMiddleware, updateOrderStatus);

export default router;

