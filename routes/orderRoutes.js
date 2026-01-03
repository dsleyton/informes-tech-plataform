const express = require('express');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/orders - Crear pedido (requiere autenticación)
router.post('/', authMiddleware, createOrder);

// GET /api/orders/my-orders - Obtener pedidos del usuario
router.get('/my-orders', authMiddleware, getUserOrders);

// GET /api/orders - Obtener todos los pedidos (admin)
router.get('/', authMiddleware, isAdmin, getAllOrders);

// PATCH /api/orders/:id - Actualizar estado del pedido (admin)
router.patch('/:id', authMiddleware, isAdmin, updateOrderStatus);

module.exports = router;