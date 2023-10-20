const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 35,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    default: "user",
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        // Custom validation for phone number format (you can customize this)
        return /^\d{8}$/.test(v); // Assumes an 8-digit phone number
      },
      message: "Phone number must be a valid 8-digit number.",
    },
  
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
});

const User = model("User", userSchema);
module.exports = User;