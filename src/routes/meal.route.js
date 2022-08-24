import controllers from "../controllers";
import express from "express";
import { AuthorizationMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/pipeline", controllers.Meal.getPipeline);
router.post("/pipeline",  AuthorizationMiddleware(["ADMIN"]),controllers.Meal.createPipeLine);
router.put("/pipeline/:id",  AuthorizationMiddleware(["ADMIN"]),controllers.Meal.updatePipeLineById);
router.delete("/pipeline/:id", AuthorizationMiddleware(["ADMIN"]), controllers.Meal.deletePipeLineById);
router.get("/pipeline/:id", controllers.Meal.getPipelineById);
router.get("/pipeline/:id/users", controllers.Meal.getUsersFromPipelineById);
// router.get("/pipeline/:id/details", controllers.Meal.getPipelineById);

export default router;
