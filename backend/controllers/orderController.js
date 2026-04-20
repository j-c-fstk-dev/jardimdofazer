const db = require('../database/db');

// Listar todos os pedidos
function getAllOrders(callback) {
  db.all('SELECT * FROM orders ORDER BY created_at DESC', [], (err, orders) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (!orders || orders.length === 0) {
      callback(null, []);
      return;
    }

    // Buscar itens para cada pedido
    let processed = 0;
    orders.forEach((order, index) => {
      db.all(
        `SELECT oi.*, p.name as product_name
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [order.id],
        (err, items) => {
          orders[index].items = items || [];
          processed++;
          if (processed === orders.length) {
            callback(null, orders);
          }
        }
      );
    });
  });
}

// Obter pedido por ID
function getOrderById(id, callback) {
  db.get('SELECT * FROM orders WHERE id = ?', [id], (err, order) => {
    if (err || !order) {
      callback(err, null);
      return;
    }

    db.all(
      `SELECT oi.*, p.name as product_name
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [id],
      (err, items) => {
        order.items = items || [];
        callback(null, order);
      }
    );
  });
}

// Criar pedido com itens
function createOrder(data, callback) {
  // Validação básica
  if (!data.customer_name || !data.email || !data.items || data.items.length === 0) {
    callback(new Error('Nome, email e itens são obrigatórios'), null);
    return;
  }

  // Calcular total
  let total = 0;
  data.items.forEach(item => {
    total += item.price * item.quantity;
  });

  db.run(
    `INSERT INTO orders (customer_name, email, phone, total_price, status)
     VALUES (?, ?, ?, ?, ?)`,
    [data.customer_name, data.email, data.phone || null, total, 'pending'],
    function(err) {
      if (err) {
        callback(err, null);
        return;
      }

      const orderId = this.lastID;
      let inserted = 0;

      // Inserir itens
      data.items.forEach(item => {
        db.run(
          `INSERT INTO order_items (order_id, product_id, quantity, price)
           VALUES (?, ?, ?, ?)`,
          [orderId, item.product_id, item.quantity, item.price],
          (err) => {
            inserted++;
            if (inserted === data.items.length) {
              getOrderById(orderId, callback);
            }
          }
        );
      });
    }
  );
}

// Atualizar status do pedido
function updateOrderStatus(id, status, callback) {
  const validStatuses = ['pending', 'paid', 'shipped', 'delivered'];
  if (!validStatuses.includes(status)) {
    callback(new Error('Status inválido'), null);
    return;
  }

  db.run('UPDATE orders SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) {
      callback(err, null);
    } else {
      getOrderById(id, callback);
    }
  });
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
};
