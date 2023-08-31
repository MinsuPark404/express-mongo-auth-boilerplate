const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { User } = require("./models/User");

const config = require("./config/key")

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

app.post("/register", async (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)

  try {
    const doc = await user.save();
    res.status(200).json({ success: true });
  } 
  catch (err) {
    res.json({ success: false, err })
  }
});

app.post('/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ user_email: req.body.emil }, (err, userInfo) => {
    if(!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  })
  // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
  user.comparePassword(req.body.user_password, (err, isMatch) => {
    if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
  })
  // 비밀번호까지 맞다면 토큰을 생성하기.
})

app.listen(port, () => {
  console.log(`서버 연결 ${port}`);
}).on('error', (err) => {
  console.log('Error:', err);
});
