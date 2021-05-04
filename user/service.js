const express = require("express");
const mongoose = require("mongoose");

// utils
const auth = require("./utils/auth");
const user = require("./utils/user");

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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
app.route("/auth")
  .post(auth.login)

app.route("/")
  .get(user.getUsers)
  .post(user.register)

app.route("/:id")
  .get(user.getUserDetail)

app.listen(8000, () => console.log("service running on port 8000"));
