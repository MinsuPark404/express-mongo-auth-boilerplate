const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { User } = require("./models/User");

const config = require("./config/key")

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("안녕하세요 1"));

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

app.listen(port, () => {
  console.log(`서버 연결 ${port}`);
}).on('error', (err) => {
  console.log('Error:', err);
});
