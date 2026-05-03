import { getDatabase } from '../database/db.js';

export const getPosts = (req, res) => {
  try {
    const db = getDatabase();
    const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();

    res.status(200).json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getPost = (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createPost = (req, res) => {
  try {
    const { title, slug, content, cover_image } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Título e conteúdo são obrigatórios'
      });
    }

    const db = getDatabase();
    const insert = db.prepare(`
      INSERT INTO posts (title, slug, content, cover_image)
      VALUES (?, ?, ?, ?)
    `);

    const result = insert.run(title, slug || title.toLowerCase().replace(/\s+/g, '-'), content, cover_image);

    res.status(201).json({
      success: true,
      message: 'Post criado com sucesso',
      data: {
        id: result.lastInsertRowid,
        title,
        slug
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updatePost = (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, cover_image } = req.body;

    const db = getDatabase();
    db.prepare(`
      UPDATE posts 
      SET title = ?, slug = ?, content = ?, cover_image = ?
      WHERE id = ?
    `).run(title, slug, content, cover_image, id);

    res.status(200).json({
      success: true,
      message: 'Post atualizado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deletePost = (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    db.prepare('DELETE FROM posts WHERE id = ?').run(id);

    res.status(200).json({
      success: true,
      message: 'Post deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
