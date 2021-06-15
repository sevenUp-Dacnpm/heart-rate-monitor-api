const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');

async function verify(id) {
  let returnModel = {}; // code; message; data
  try {
    const user = await User.findById(id);
    // update returnModel
    returnModel = {
      code: 200,
      message: 'Successful!',
      data: user,
    };
  } catch (err) {
    // update returnModel
    returnModel = {
      code: 400,
      message: 'invalid credentials!',
    };
  } finally {
    return returnModel;
  }
}

async function login(formData) {
  let returnModel = {}; // code; message; data
  try {
    const user = await User.findOne({ username: formData.username });
    if (!user) {
      throw new Error();
    }
    const isMatch = await bcrypt.compare(formData.password, user.password);
    if (isMatch) {
      // create new token
      const token = jwt.sign({ id: user._id }, config.secretKey, {
        expiresIn: 1800,
      });
      // update returnModel
      returnModel = {
        code: 200,
        message: 'Successful!',
        data: { user, token },
      };
    } else {
      throw new Error();
    }
  } catch (err) {
    // update returnModel
    returnModel = {
      code: 400,
      message: 'invalid credentials!',
    };
  } finally {
    return returnModel;
  }
}

async function register(formData) {
  let returnModel = {}; // code; message; data
  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(formData.password, salt);
    // create new user
    const newUser = new User({
      username: formData.username,
      password: hashPassword,
      profile: formData.profile,
    });
    await newUser.save();
    // update returnModel
    returnModel = {
      code: 200,
      message: 'Successful!',
      data: newUser,
    };
  } catch (err) {
    //update returnModel
    returnModel = {
      code: 500,
      message: 'server error',
    };
  } finally {
    return returnModel;
  }
}

module.exports = {
  verify,
  login,
  register,
};
