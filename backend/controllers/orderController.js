const Order = require('../models/Order'); // Adjust the import path as needed
const User = require('../models/User');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      buyer,
      items,
      shippingAddress,
      totalPrice
    } = req.body;

    const newOrder = new Order({
      buyer,
      items,
      shippingAddress,
      totalPrice
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate([
        {
          path: 'buyer',
          model: User, // Use the User model
          select: 'username', // Select the 'username' field
        },
        {
          path: 'items.listing', // Populate the items.listing field
        },
      ])
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order by ID
const updateOrderById = async (req, res) => {
  try {
    console.log('Order ID:', req.params.orderId);
    console.log('Update Data:', req.body);

    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ error: error.message });
  }
};


// Delete order by ID
const deleteOrderById = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
};