const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  user_name: {
    type: String,
    maxlength: 50
  },
  user_email: {
    type: String,
    trim: true,
    unique: 1
  },
  user_password: {
    type: String,
    minlength: 5
  },
  user_lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  tokon: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

const User = mongoose.model('User', userSchema);

module.exports = {User}