// models
const HeartRateRecord = require("../models/HeartRateRecord");

async function getHeartRate(req, res) {
  try {
    const heartRates = await HeartRateRecord.find({ userId: req.query.userId });
    res.json({ heartRates });
  } catch (err) {
    res.status(500).json({
      msg: "server error"
    });
  }
}

async function getHeartRateDetail(req, res) {
  try {
    const heartRate = await HeartRateRecord.findOne({
      _id: req.params.id,
      userId: req.query.userId
    })
    res.json({ heartRate });
  } catch (err) {
    res.status(500).json({
      msg: "server error"
    });
  }
}

async function createHeartRate(req, res) {
  try {
    const { heartRate, status } = req.body;

    // create new heart rate
    const newHeartRate = new HeartRateRecord({
      userId: req.query.userId,
      heartRate,
      status
    });
    await newHeartRate.save();

    res.status(201).json({
      heartRate: newHeartRate
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "server error"
    });
  }
}

module.exports = {
  getHeartRate,
  getHeartRateDetail,
  createHeartRate
}