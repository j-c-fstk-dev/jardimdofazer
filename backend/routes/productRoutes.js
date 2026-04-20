const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET - Listar todos os produtos
router.get('/', (req, res) => {
  productController.getAllProducts((err, products) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  });
});

// GET - Obter produto por ID
router.get('/:id', (req, res) => {
  productController.getProductById(req.params.id, (err, product) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado'
      });
    }

    res.json({
      success: true,
      data: product
    });
  });
});

// POST - Criar novo produto
router.post('/', (req, res) => {
  productController.createProduct(req.body, (err, product) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      data: product,
      message: 'Produto criado com sucesso'
    });
  });
});

// PUT - Atualizar produto
router.put('/:id', (req, res) => {
  productController.updateProduct(req.params.id, req.body, (err, product) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      data: product,
      message: 'Produto atualizado com sucesso'
    });
  });
});

// DELETE - Deletar produto
router.delete('/:id', (req, res) => {
  productController.deleteProduct(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      data: result
    });
  });
});

module.exports = router;
