const mongoose=require('mongoose');
const {Schema,model}=mongoose;
const reportSchema = new Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Report = model("Report", reportSchema);
module.exports=Report;
