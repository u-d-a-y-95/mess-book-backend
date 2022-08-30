import express from "express";
import apiRoute from "./routes";
import errorMiddleware from "./middleware/errorMiddleware";
import cors from "cors";
import path from "path"
import { io } from "./server";

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api", apiRoute);
app.use('/static', express.static(path.join(__dirname,'uploads')))

app.get("/", (req, res) => {
  res.status(200).json("api is running");
});
app.use(errorMiddleware);

export default app;
