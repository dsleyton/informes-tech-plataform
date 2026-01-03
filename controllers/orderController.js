const db = require('../config/db');

// Crear nuevo pedido
const createOrder = async (req, res) => {
  try {
    const { category_id, title, description, price, deadline } = req.body;
    const user_id = req.user.id;

    const newOrder = await db.query(
      'INSERT INTO orders (user_id, category_id, title, description, price, deadline) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, category_id, title, description, price, deadline]
    );

    res.status(201).json({
      message: 'Pedido creado exitosamente',
      order: newOrder.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

// Obtener pedidos del usuario
const getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.id;

    const orders = await db.query(
      'SELECT o.*, c.name as category_name FROM orders o LEFT JOIN categories c ON o.category_id = c.id WHERE o.user_id = $1 ORDER BY o.created_at DESC',
      [user_id]
    );

    res.json(orders.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

// Obtener todos los pedidos (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await db.query(
      'SELECT o.*, c.name as category_name, u.name as user_name, u.email as user_email FROM orders o LEFT JOIN categories c ON o.category_id = c.id LEFT JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC'
    );

    res.json(orders.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

// Actualizar estado del pedido (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await db.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (updatedOrder.rows.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.json({
      message: 'Estado actualizado exitosamente',
      order: updatedOrder.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus };