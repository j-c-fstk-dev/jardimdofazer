import { getDatabase } from '../database/db.js';

export const getOrders = (req, res) => {
  try {
    const db = getDatabase();
    const orders = db.prepare(`
      SELECT o.*, COUNT(oi.id) as item_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `).all();

    res.status(200).json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getOrder = (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    const items = db.prepare(`
      SELECT oi.*, p.name as product_name
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `).all(id);

    order.items = items;

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createOrder = (req, res) => {
  try {
    const { customer_name, email, phone, items, total_price } = req.body;

    if (!customer_name || !email || !items || !total_price) {
      return res.status(400).json({
        success: false,
        message: 'Dados obrigatórios faltando'
      });
    }

    const db = getDatabase();

    const orderInsert = db.prepare(`
      INSERT INTO orders (customer_name, email, phone, total_price)
      VALUES (?, ?, ?, ?)
    `);

    const orderResult = orderInsert.run(customer_name, email, phone, total_price);
    const orderId = orderResult.lastInsertRowid;

    const itemInsert = db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `);

    items.forEach(item => {
      itemInsert.run(orderId, item.product_id, item.quantity, item.price);
    });

    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: {
        id: orderId,
        customer_name,
        email,
        total_price
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status é obrigatório'
      });
    }

    const db = getDatabase();
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);

    res.status(200).json({
      success: true,
      message: 'Status atualizado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
