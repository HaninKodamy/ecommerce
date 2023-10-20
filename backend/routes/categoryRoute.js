const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');

// Create a new category
router.post('/categories', categoryController.addCategory);


// Delete a category by names
router.delete('/categories/:name', categoryController.deleteCategory);

// Update a category by name
router.put('/categories/:name', categoryController.updateCategory);

// Get all categories
router.get('/categories', categoryController.getCategories);

module.exports = router;
