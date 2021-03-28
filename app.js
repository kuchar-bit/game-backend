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

  // Welcome current user
  socket.emit("message", "Welcome in the battle");

  // Broadcast if user connects
  socket.broadcast.emit("message", "A user has joined the chat")

  socket.on("user_data", ({ user }) => { 
    const user_info = user;
    console.log(user_info);
  });

  socket.on("props_room", ({ name }) => {
    console.log(name);
  });
  

  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat")
  });
});

server.listen(5000, () => console.log("App is listing on 5000"));
