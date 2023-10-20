const Category = require("../models/Category.js");

exports.addCategory = async (req, res) => {
  try {
    const { name, images } = req.body;
    const newCategory = new Category({ name, images });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Could not create the category' });
  }
};

// Controller to delete a category by name
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (deletedCategory) {
      res.status(200).json(deletedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the category' });
  }
};

// Controller to update a category by name
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, images } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, images },
      { new: true } // To return the updated category
    );
    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the category' });
  }
};

// Controller to get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
