import { getDatabase } from '../database/db.js';

export const getProducts = (req, res) => {
  try {
    const db = getDatabase();
    const products = db.prepare(`
      SELECT p.*, 
        GROUP_CONCAT(pi.image_url, ',') as images
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `).all();

    const formattedProducts = products.map(p => ({
      ...p,
      images: p.images ? p.images.split(',') : []
    }));

    res.status(200).json({
      success: true,
      data: formattedProducts,
      count: formattedProducts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getProduct = (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }

    const images = db.prepare('SELECT image_url FROM product_images WHERE product_id = ? ORDER BY order_index').all(id);
    product.images = images.map(i => i.image_url);

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createProduct = (req, res) => {
  try {
    const { name, description, price, type, stock, production_time } = req.body;

    if (!name || !price || !type) {
      return res.status(400).json({
        success: false,
        message: 'Nome, preço e tipo são obrigatórios'
      });
    }

    const db = getDatabase();
    const insert = db.prepare(`
      INSERT INTO products (name, description, price, type, stock, production_time)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(name, description, price, type, stock, production_time);

    res.status(201).json({
      success: true,
      message: 'Produto criado com sucesso',
      data: {
        id: result.lastInsertRowid,
        name,
        price,
        type
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, type, stock, production_time } = req.body;

    const db = getDatabase();
    const update = db.prepare(`
      UPDATE products 
      SET name = ?, description = ?, price = ?, type = ?, stock = ?, production_time = ?
      WHERE id = ?
    `);

    update.run(name, description, price, type, stock, production_time, id);

    res.status(200).json({
      success: true,
      message: 'Produto atualizado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    
    db.prepare('DELETE FROM products WHERE id = ?').run(id);

    res.status(200).json({
      success: true,
      message: 'Produto deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
