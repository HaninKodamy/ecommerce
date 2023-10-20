const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User =require("../models/User"); // Adjust the import path as needed

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, phoneNumber } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
    
    });
    console.log("newUser", newUser);
    await newUser.save();

    console.log("newUser._id", newUser._id)
    const token = jwt.sign({ userId: newUser._id }, "RAZOV");
    console.log("token", token)
    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, "RAZOV");
    // Include the user's role in the response
    return res
      .status(200)
      .json({ message: "Login successful", user: user, role: user.role, token:token });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Check if a user is an admin
const checkIfAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      res.json({ isAdmin: true });
    } else {
      res.json({ isAdmin: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  checkIfAdmin,
  registerUser,
  loginUser,
};