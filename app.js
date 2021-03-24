const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const AuthRoute = require("./routes/route");

const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
require("dotenv/config");

app.use(express.json());
app.use(cors());

app.use("/app", AuthRoute);

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => console.log("Connected to db")
);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join", ({ tag }) => {
    console.log(tag);
  });

  socket.on("disconnect", () => {
    console.log("Use had left!");
  });
});

server.listen(5000, () => console.log("App is listing on 5000"));
