const bcrypt = require("bcrypt");

// models
const User = require("../models/User");

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    res.status(500).json({
      msg: "server error"
    });
  }
}

async function getUserDetail(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({
      msg: "server error"
    });
  }
}

async function register(req, res) {
  console.log('register');
  console.log(req.body);
  try {
    const { username, password, profile } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Crate new user
    const newUser = new User({
      username,
      password: hashPassword,
      profile
    });
    await newUser.save();

    res.status(201).json({
      user: newUser
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "server error"
    });
  }
}

module.exports = {
  getUsers,
  getUserDetail,
  register
}