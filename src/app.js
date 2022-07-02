import express from "express";
import apiRoute from "./routes";
import errorMiddleware from "./middleware/errorMiddleware";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api", apiRoute);

app.get("/",(req,res)=>{res.status(200).json("api is running")})
app.use(errorMiddleware);

export default app