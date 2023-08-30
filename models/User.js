const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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

userSchema.pre('save', (next)=>{
  var user = this;

  if(user.isModified('user_password')){
    // 비밀번호를 암호화 시킵니다.
    bcrypt.genSalt(saltRounds, (err, salt)=>{
      if(err) return next(err);
      bcrypt.hash(myPlaintextPassword, salt, (err, hash)=>{
        // myPlaintextPassword : 암호화 전 비밀번호
        // hash : 암호화된 비밀번호
        // 비밀번호 DB에 고정된 길이의 문자열로 변환 후 저장합니다.
        if(err) return next(err);
        user.password = hash
        next()
      });
    });
  }
})

const User = mongoose.model('User', userSchema);

module.exports = {User}






    // 비밀번호를 암호화 시킵니다.
    // bcrypt.genSalt(saltRounds, (err, salt)=>{
    //   if(err) return next(err);
    //   bcrypt.hash(myPlaintextPassword, salt, (err, hash)=>{
    //     // myPlaintextPassword : 암호화 전 비밀번호
    //     // hash : 암호화된 비밀번호
    //     // 비밀번호 DB에 고정된 길이의 문자열로 변환 후 저장합니다.
    //     if(err) return next(err);
    //     user.password = hash
    //     next()
    //   });
    // });