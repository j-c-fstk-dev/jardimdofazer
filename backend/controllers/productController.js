const db = require('../database/db');

// Listar todos os produtos
function getAllProducts(callback) {
  db.all('SELECT * FROM products ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows || []);
    }
  });
}

// Obter produto por ID
function getProductById(id, callback) {
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err || !product) {
      callback(err, null);
      return;
    }

    // Buscar imagens do produto
    db.all('SELECT * FROM product_images WHERE product_id = ? ORDER BY order_index', [id], (err, images) => {
      product.images = images || [];

      // Se é produto digital, buscar detalhes
      if (product.type === 'digital') {
        db.get('SELECT * FROM digital_products WHERE product_id = ?', [id], (err, digital) => {
          product.digital = digital || null;
          callback(null, product);
        });
      } else {
        callback(null, product);
      }
    });
  });
}

// Criar produto
function createProduct(data, callback) {
  // Validação básica
  if (!data.name || !data.price || !data.type) {
    callback(new Error('Nome, preço e tipo são obrigatórios'), null);
    return;
  }

  db.run(
    `INSERT INTO products (name, description, price, type, stock, production_time)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data.name, data.description || null, data.price, data.type, data.stock || null, data.production_time || null],
    function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, ...data });
      }
    }
  );
}

// Atualizar produto
function updateProduct(id, data, callback) {
  db.run(
    `UPDATE products
     SET name = ?, description = ?, price = ?, type = ?, stock = ?, production_time = ?
     WHERE id = ?`,
    [data.name, data.description, data.price, data.type, data.stock, data.production_time, id],
    function(err) {
      if (err) {
        callback(err, null);
      } else {
        getProductById(id, callback);
      }
    }
  );
}

// Deletar produto
function deleteProduct(id, callback) {
  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { message: 'Produto deletado com sucesso' });
    }
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
