const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute.js');
const connectdb = require('./config/connectDB.js');
const categoryRouter = require('./routes/categoryRoute.js');
const listingRouter = require('./routes/listingRoute.js');
const orderRoute = require('./routes/orderRoute.js');
const reportRoute = require('./routes/reportRoute');
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.static('public')); // Replace 'public' with the actual directory where your images are located
app.use(express.json());

// Define your routes
app.use('/api', userRouter); // Include your user route (and other routes) here
app.use('/api', categoryRouter);
app.use('/api', listingRouter);
app.use('/api', orderRoute);
app.use('/api', reportRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log('Server is running on port ' + PORT);
});
