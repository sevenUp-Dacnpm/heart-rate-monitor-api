const Record = require("../models/Record");

async function getHeartRates(req, res) {
  try {
    console.log(req.user);
    const heartRates = await Record.find({ userId: req.user.id });
    res.json({ heartRates });
  } catch (err) {
    res.status(500).json({
      msg: "server error"
    });
  }
}

async function getHeartRateDetail(req, res) {
  try {
    const heartRate = await Record.findById(req.params.id);
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
    const newHeartRate = new Record({
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
  getHeartRates,
  getHeartRateDetail,
  createHeartRate
}