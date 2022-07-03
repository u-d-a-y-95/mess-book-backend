import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import socketOnConnection from "./socket";

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  {
    autoIndex: true,
  },
  () => {}
);

const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {
  console.log("server is running");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socketOnConnection);
