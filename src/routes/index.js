import express from "express"

import userRoute from "./user.route"
import mealRoute from "./meal.route"


const router = express.Router()

router.use("/users",userRoute)
router.use("/meals",mealRoute)

export default router