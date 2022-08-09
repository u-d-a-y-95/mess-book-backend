import controllers from "../controllers";
import express from "express";
const router = express.Router();

router.get("/pipeline", controllers.Meal.getPipeline);
router.post("/pipeline", controllers.Meal.createPipeLine);
router.put("/pipeline/:id", controllers.Meal.updatePipeLineById);
router.delete("/pipeline/:id", controllers.Meal.deletePipeLineById);
router.get("/pipeline/:id", controllers.Meal.getPipelineById);

export default router;
