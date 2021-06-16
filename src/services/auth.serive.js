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
      return {
        code: 400,
        message: 'User is already exists',
      };
    }
    const isMatch = await bcrypt.compare(formData.password, user.password);
    if (isMatch) {
      // create new token
      const token = jwt.sign({ id: user._id }, config.secretKey, {
        expiresIn: 1400 * 3600,
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
    const user = await User.findOne({ username: formData.username });
    if (user) {
      return {
        code: 400,
        message: 'Username is already exists!',
      };
    }
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
    return {
      code: 200,
      message: 'Successful!',
      data: newUser,
    };
  } catch (err) {
    // update returnModel
    console.log(err);
    return {
      code: 500,
      message: 'server error',
    };
  }
}

module.exports = {
  verify,
  login,
  register,
};
