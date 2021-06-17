const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  state: {
    type: String,
  },
  note: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

module.exports = mongoose.model('record', RecordSchema);
