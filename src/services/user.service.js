const User = require('../models/User');

async function getUsers() {
  let returnModel = {}; // code; message; data
  try {
    const users = await User.find().select('-password');
    // update returnModel
    returnModel = {
      code: 200,
      message: 'Successful!',
      data: users,
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

async function getUserDetail(id) {
  let returnModel = {}; // code; message; data
  try {
    const user = await User.findById(id);

    // update returnModel
    user.password = undefined;
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

async function updateUser(id, profile) {
  let returnModel = {}; // code; message; data

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { profile },
      { new: true }
    ).exec();

    // update returnModel
    user.password = undefined;
    returnModel = {
      code: 200,
      message: 'Update successful!',
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

module.exports = {
  getUsers,
  getUserDetail,
  updateUser,
};
