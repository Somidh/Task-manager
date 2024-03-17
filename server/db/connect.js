const mongoose = require("mongoose");

const connectDB = (url) => {
  console.log("CONNECTED TO THE DB....");
  return mongoose.connect(url);
};

module.exports = connectDB;
