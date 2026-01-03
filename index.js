const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: ' API de @informes.tech funcionando',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      categories: '/api/categories',
      orders: '/api/orders'
    }
  });
});

// Ruta de prueba de base de datos
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ 
      success: true, 
      timestamp: result.rows[0].now,
      message: ' Base de datos conectada'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Servidor corriendo en puerto ${PORT}`);
  console.log(` http://localhost:${PORT}`);
});