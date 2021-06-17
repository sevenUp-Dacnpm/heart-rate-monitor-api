const Record = require('../models/Record');

async function getHeartRates(userId) {
  let returnModel = {}; // code; message; data
  try {
    const heartRates = await Record.find({ userId });
    // update returnModel
    returnModel = {
      code: 200,
      message: 'Successful!',
      data: heartRates,
    };
  } catch (err) {
    // update returnModel
    returnModel = {
      code: 500,
      message: 'server error',
    };
  } finally {
    return returnModel;
  }
}

async function getHeartRateDetail(id) {
  let returnModel = {}; // code; message; data
  try {
    const heartRate = await Record.findById(id);
    // update returnModel
    returnModel = {
      code: 200,
      message: 'Successful!',
      data: heartRate,
    };
  } catch (err) {
    // update returnModel
    returnModel = {
      code: 500,
      message: 'server error',
    };
  } finally {
    return returnModel;
  }
}

async function createHeartRate(userId, formData) {
  let returnModel = {}; // code; message; data
  try {
    // create new heart rate
    const newHeartRate = new Record({
      userId,
      heartRate: formData.heartRate,
      status: formData.status,
      note: formData.note,
      createdAt: formData.createdAt
    });
    await newHeartRate.save();
    // update returnModel
    returnModel = {
      code: 201,
      message: 'Successful!',
      data: newHeartRate,
    };
  } catch (err) {
    // update returnModel
    returnModel = {
      code: 500,
      message: 'server error',
    };
  } finally {
    return returnModel;
  }
}

module.exports = {
  getHeartRates,
  getHeartRateDetail,
  createHeartRate,
};
