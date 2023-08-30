const express = require('express');
const app = express();
const port = 3000

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://gjaischool:1234@boilerplate.e3ytvil.mongodb.net/')
  .then(()=>{console.log('MongoDB connected...')})
  .catch(err => console.log(err))



app.get('/', (req, res)=> res.send('안녕하세요'));

app.listen(port, ()=>{console.log(`서버 연결 ${port}`)})