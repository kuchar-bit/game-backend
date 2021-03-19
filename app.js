const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');


require('dotenv/config')


app.use(express.json());
app.use(cors())

app.post('/register', (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

})

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => console.log("Connected to db")
);

app.listen(5000, () => console.log('App is listing on 5000'));
