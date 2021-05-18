const User = require("../models/User");

async function getUsers() {
  let returnModel = {}; // code; message; data
  try {
    const users = await User.find();
    //update returnModel
    returnModel = {
      'code': 200,
      'message': 'Successful!',
      'data': users 
    }
  } catch (err) {
    //update returnModel
    returnModel = {
      'code': 400,
      'message': 'invalid credentials!' 
    }
  } finally{
    return returnModel;
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