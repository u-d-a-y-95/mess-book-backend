import express from "express"
import dotenv from 'dotenv'
import apiRoute from "./routes"

dotenv.config()

const app = express()

// middleware config

app.use(express.json())


app.use("/api",apiRoute)


app.listen(process.env.APP_PORT || 4000,()=>{console.log("server is running")})