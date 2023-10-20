const mongoose = require("mongoose");
const url =
  "mongodb+srv://haneen:123123321@e-commercee.nlkrpop.mongodb.net/shopnexa";

// mongoose.connect(url);

const connectdb = async (dbURL) => {
  try {
    await mongoose.connect(dbURL).then(
      () => console.log("connected Successfully...."),
      (err) => console.log("connection error", err)
    );
  } catch (error) {
    console.log(error);
  }
};

connectdb(url);
