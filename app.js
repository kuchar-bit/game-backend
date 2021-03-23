const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const AuthRoute = require("./routes/route");
const socketio = require("socket.io");
const http = require("http");
require("dotenv/config");

app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("We have a new connection");

  socket.on("disconnect", () => {
    console.log("User had left");
  });
});

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => console.log("Connected to db")
);

app.use("/app", AuthRoute);

app.listen(5000, () => console.log("App is listing on 5000"));
