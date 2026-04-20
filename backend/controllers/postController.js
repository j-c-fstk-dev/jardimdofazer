const db = require('../database/db');

// Gerar slug a partir do título
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Listar todos os posts
function getAllPosts(callback) {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows || []);
    }
  });
}

// Obter post por ID
function getPostById(id, callback) {
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, post || null);
    }
  });
}

// Obter post por slug
function getPostBySlug(slug, callback) {
  db.get('SELECT * FROM posts WHERE slug = ?', [slug], (err, post) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, post || null);
    }
  });
}

// Criar post
function createPost(data, callback) {
  // Validação básica
  if (!data.title || !data.content) {
    callback(new Error('Título e conteúdo são obrigatórios'), null);
    return;
  }

  const slug = generateSlug(data.title);

  db.run(
    `INSERT INTO posts (title, slug, content, cover_image)
     VALUES (?, ?, ?, ?)`,
    [data.title, slug, data.content, data.cover_image || null],
    function(err) {
      if (err) {
        callback(err, null);
      } else {
        getPostById(this.lastID, callback);
      }
    }
  );
}

// Atualizar post
function updatePost(id, data, callback) {
  db.run(
    `UPDATE posts
     SET title = ?, content = ?, cover_image = ?
     WHERE id = ?`,
    [data.title, data.content, data.cover_image || null, id],
    function(err) {
      if (err) {
        callback(err, null);
      } else {
        getPostById(id, callback);
      }
    }
  );
}

// Deletar post
function deletePost(id, callback) {
  db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { message: 'Post deletado com sucesso' });
    }
  });
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
};
