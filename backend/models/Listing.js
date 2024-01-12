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
 
  images: [
    {
      type: String,
    },
  ],
  datePosted: {
    type: Date,
    default: Date.now,
  },

});

const Listing=model("Listing",listingSchema);
module.exports=Listing;
