const express = require('express');
const {loginUser,registerUser,getAllUsers,checkIfAdmin,getUserById,updateUserById,deleteUserById} = require('../controllers/userController');
// import {registerUser,getAllUsers,checkIfAdmin,getUserById,updateUserById,deleteUserById} from '../controllers/userController'
const router = express.Router();
// Create a new user
router.post('/users', registerUser);

// Get all users
router.get('/users', getAllUsers);

router.post('/users/login',loginUser);
// Route to check if a user is an admin
router.get('/users/:userId/checkAdmin', checkIfAdmin);

// Get user by ID
router.get('/users/:userId', getUserById);

// Update user by ID
router.put('/users/:userId', updateUserById);

// Delete user by ID
router.delete('/users/:userId', deleteUserById);

module.exports = router;