const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connected database");
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = connectDB;