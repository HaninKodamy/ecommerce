const mongoose=require('mongoose');
const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pricePerLine: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  items: [orderItemSchema],

  shippingAddress:{ 
    type: String,
    required:true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  adminApprovalStatus: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
});

const Order = model("Order", orderSchema);
module.exports=Order;
