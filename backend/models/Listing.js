const mongoose=require('mongoose');
const {Schema,model}=mongoose;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantityStock:{
    type: Number,
    required: true,
    min: 0,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  images: [
    {
      type: String, // Assuming image URLs as strings
    },
  ],
  datePosted: {
    type: Date,
    default: Date.now,
  },

  adminApprovalStatus: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
  
  adminApprover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const Listing=model("Listing",listingSchema);
module.exports=Listing;
