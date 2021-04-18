const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.dbCollection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected...");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
