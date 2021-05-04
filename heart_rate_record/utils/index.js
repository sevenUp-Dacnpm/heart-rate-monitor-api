// models
const HeartRateRecord = require("../models/HeartRateRecord");

async function getHeartRate(req, res) {
  try {
    const heartRates = await HeartRateRecord.find({ userId: req.user.id });
    res.json({ heartRates });
  } catch (err) {
    res.status(500).json({
      msg: "server error"
    });
  }
}

async function getHeartRateDetail(req, res) {
  try {
    const heartRate = await HeartRateRecord.findById(req.params.id);
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

    // Crate new heart rate
    const newHeartRate = new HeartRateRecord({
      userId: req.user.id,
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