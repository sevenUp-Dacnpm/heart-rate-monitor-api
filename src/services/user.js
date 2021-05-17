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

module.exports = {
  getUsers,
  getUserDetail
}