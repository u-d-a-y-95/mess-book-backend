import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import apiRoute from "./routes";
import errorMiddleware from "./services/middleware/errorMiddleware";

dotenv.config();

const app = express();


// mongoose connection

mongoose.connect(`mongodb+srv://tuna:tuni@development.evb9k.mongodb.net/messbook?retryWrites=true&w=majority`,()=>{
    console.log("mongoose is connected with database")
})

// middleware config

app.use(express.json());

app.use("/api", apiRoute);

// error middleware

app.use(errorMiddleware);

app.listen(process.env.APP_PORT || 4000, () => {
  console.log("server is running");
});
