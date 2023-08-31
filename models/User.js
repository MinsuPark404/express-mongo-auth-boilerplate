const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
  user_name: {
    type: String,
    maxlength: 50
  },
  user_email: {
    type: String,
    trim: true,
    unique: 1,
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
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('user_password')) {
    // 비밀번호를 암호화
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.user_password, salt, (err, hash) => {
        if (err) return next(err);
        user.user_password = hash;
        next();  // 암호화가 성공적으로 끝났으면 다음 단계로
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, cb){
  // plainPassword: 암호화 전 비밀번호   암호화된 비밀번호
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err),
      cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb){
  var user = this;

  // jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sige(user._id.toHexString(), 'secretToken')
  // user._id + 'secretToken' = token
  // ->
  // 'secretToken' -> user._id

  user.token = token
  user.save(function(err, user) {
    if(err) return cb(err)
    cb(null, user)
  })
}

const User = mongoose.model('User', userSchema);

module.exports = {User}