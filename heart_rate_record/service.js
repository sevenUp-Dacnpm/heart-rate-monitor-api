const express = require("express");
const mongoose = require("mongoose");
const app = express();

// utils
const utils = require("./utils");

// connect DB
(async function (url) {
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
})(process.env.DB_URI);

app.route("/")
  .get(utils.getHeartRate)
  .post(utils.createHeartRate)

app.route("/:id")
  .get(utils.getHeartRateDetail)

app.listen(8000, () => console.log("service running on port 8000"));