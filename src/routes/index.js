import express from "express"

import userRoute from "./user.route"
import mealRoute from "./meal.route"
import authRoute from "./auth.route"

import AuthMiddleware from "../middleware/authMiddleware"

const router = express.Router()

router.use("/users",AuthMiddleware,userRoute)
router.use("/meals",AuthMiddleware,mealRoute)
router.use("/auth",authRoute)

export default router