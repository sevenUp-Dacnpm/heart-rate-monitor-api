const express = require("express");
const mongoose = require("mongoose");
const app = express();

// middleware
const authMw = require("../users/middleware/auth");

// controllers
const ctrl = require("./controllers");

(async function (dbUrl) { // connect DB
  try {
    const opts = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    await mongoose.connect(dbUrl, opts);
    console.log("connected heart rate record database");
  } catch (err) {
    console.error(err.message);
  }
})(process.env.DB || "mongodb://localhost:27017/microservices");

app.route("/")
  .get(authMw, ctrl.getHeartRate)
  .post(authMw, ctrl.createHeartRate)

app.route("/:id")
  .get(authMw, ctrl.getHeartRateDetail)

app.listen(8000, () => console.log("heart rate record service running on port 8000"));