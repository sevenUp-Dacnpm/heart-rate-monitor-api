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
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    dob: {
      type: Date,
      default: Date.now(),
    },
  },
});

module.exports = mongoose.model('user', Userchema);
