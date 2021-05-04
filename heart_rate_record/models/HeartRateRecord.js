const mongoose = require("mongoose");

const HeartRateRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true
  },
  heartRate: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  state: {
    type: String
  }
});

module.exports = mongoose.model("heart-rate-record", HeartRateRecordSchema);