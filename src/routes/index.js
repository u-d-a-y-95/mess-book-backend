import express from "express"

import userRoute from "./user.route"
import mealRoute from "./meal.route"
import authRoute from "./auth.route"
import profileRoute from "./profile.route"
import adminRoute from "./admin.route"

import AuthMiddleware from "../middleware/authMiddleware"

const router = express.Router()

router.use("/users",AuthMiddleware,userRoute)
router.use("/meals",AuthMiddleware,mealRoute)
router.use("/profile",AuthMiddleware,profileRoute)
router.use("/auth",authRoute)
router.use("admin",adminRoute)

export default router