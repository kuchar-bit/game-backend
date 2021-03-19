const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const registerRoute = require('./routes/route');
require('dotenv/config')



// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => console.log("Connected to db")
);

app.use(express.json());
app.use(cors());
app.use("/app", registerRoute);

app.listen(5000, () => console.log('App is listing on 5000'));
