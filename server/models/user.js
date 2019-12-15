const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'authorized'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
