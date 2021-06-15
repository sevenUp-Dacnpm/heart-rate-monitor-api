const mongoose = require('mongoose');

const Userchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  profile: {
    fullName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    dob: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
});

module.exports = mongoose.model('user', Userchema);
