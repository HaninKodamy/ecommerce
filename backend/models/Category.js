const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String, // Assuming image URLs as strings
    },
  ],
});

const Category = model("Category", categorySchema);
module.exports = Category;
