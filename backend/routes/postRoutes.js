const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET - Listar todos os posts
router.get('/', (req, res) => {
  postController.getAllPosts((err, posts) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  });
});

// GET - Obter post por ID
router.get('/:id', (req, res) => {
  postController.getPostById(req.params.id, (err, post) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post não encontrado'
      });
    }

    res.json({
      success: true,
      data: post
    });
  });
});

// GET - Obter post por slug
router.get('/slug/:slug', (req, res) => {
  postController.getPostBySlug(req.params.slug, (err, post) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post não encontrado'
      });
    }

    res.json({
      success: true,
      data: post
    });
  });
});

// POST - Criar novo post
router.post('/', (req, res) => {
  postController.createPost(req.body, (err, post) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      data: post,
      message: 'Post criado com sucesso'
    });
  });
});

// PUT - Atualizar post
router.put('/:id', (req, res) => {
  postController.updatePost(req.params.id, req.body, (err, post) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      data: post,
      message: 'Post atualizado com sucesso'
    });
  });
});

// DELETE - Deletar post
router.delete('/:id', (req, res) => {
  postController.deletePost(req.params.id, (err, result) => {
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
