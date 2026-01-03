const db = require('../config/db');

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const categories = await db.query('SELECT * FROM categories ORDER BY name');
    res.json(categories.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.query('SELECT * FROM categories WHERE id = $1', [id]);

    if (category.rows.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(category.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener categoría' });
  }
};

module.exports = { getAllCategories, getCategoryById };