import controllers from "../controllers";
import express from "express";
import { AuthorizationMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/pipeline", controllers.Meal.getPipeline);
router.get("/pipeline/:id", controllers.Meal.getPipelineById);
router.get("/pipeline/:id/summary", controllers.Meal.getPipelineSummaryById);
router.get("/pipeline/:id/users", controllers.Meal.getUsersFromPipelineById);

router.post(
  "/pipeline",
  AuthorizationMiddleware(["ADMIN"]),
  controllers.Meal.createPipeLine
);
router.patch(
  "/pipeline/:id",
  AuthorizationMiddleware(["ADMIN"]),
  controllers.Meal.updatePipeLineById
);
router.delete(
  "/pipeline/:id",
  AuthorizationMiddleware(["ADMIN"]),
  controllers.Meal.deletePipeLineById
);
router.patch(
  "/pipeline/:id/status",
  AuthorizationMiddleware(["ADMIN"]),
  controllers.Meal.changePipeLineStatusById
);

export default router;
