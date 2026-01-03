const express = require('express');
const { getAllCategories, getCategoryById } = require('../controllers/categoryController');

const router = express.Router();

// GET /api/categories
router.get('/', getAllCategories);

// GET /api/categories/:id
router.get('/:id', getCategoryById);

module.exports = router;