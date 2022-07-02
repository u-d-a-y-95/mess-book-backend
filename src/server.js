import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import app from "./app";
import socketOnConnection from "./socket";
const { Server } = require("socket.io");

dotenv.config();

mongoose.connect(
  `mongodb+srv://tuna:tuni@development.evb9k.mongodb.net/messbook?retryWrites=true&w=majority`,
  {
    autoIndex: true, //make this also true
  },
  () => {
    console.log("mongoose is connected with database");
  }
);

const server = http.createServer(app);

server.listen(process.env.APP_PORT || 4000, () => {
  console.log("server is running");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socketOnConnection);
