const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET - Listar todos os pedidos
router.get('/', (req, res) => {
  orderController.getAllOrders((err, orders) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  });
});

// GET - Obter pedido por ID
router.get('/:id', (req, res) => {
  orderController.getOrderById(req.params.id, (err, order) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado'
      });
    }

    res.json({
      success: true,
      data: order
    });
  });
});

// POST - Criar novo pedido
router.post('/', (req, res) => {
  orderController.createOrder(req.body, (err, order) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      data: order,
      message: 'Pedido criado com sucesso'
    });
  });
});

// PUT - Atualizar status do pedido
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({
      success: false,
      error: 'Status é obrigatório'
    });
  }

  orderController.updateOrderStatus(req.params.id, status, (err, order) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      data: order,
      message: 'Status atualizado com sucesso'
    });
  });
});

module.exports = router;
