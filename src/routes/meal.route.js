
import controllers from "../controllers"
import express from "express"
const  router = express.Router()

router.get("/pipeline",controllers.Meal.getPipeline)
router.post("/pipeline",controllers.Meal.createPipeLine)



export default router