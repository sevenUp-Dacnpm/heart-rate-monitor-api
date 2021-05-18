const config = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

async function verify() {
  let returnModel = {};
  try {
    const user = await User.findById(req.user.id);
     //update returnModel
    returnModel = {
      'code': 200,
      'message': 'Successful!',
      'data': users 
    }
    if (user) {
      res.json({ user });
    }
  } catch (err) {
    returnModel = {
      'code': 400,
      'message': 'Invalid credentials!'
    }
  }finally{
    return returnModel;
  }
}


async function login(req) {
  let returnModel = {};
  try {
    const { username, password } = req;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // create new token
      const token = jwt.sign(
        { id: user._id },
        config.secretKey,
        { expiresIn: 1800 }
      );

      res.json({ user, token });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(400).json({
      msg: "invalid credentials"
    });
  }
}

async function register(req, res) {
  try {
    const { username, password, profile } = req.body;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
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
  verify,
  login,
  register
}