import express from "express";

import userRoute from "./user.route";
import mealRoute from "./meal.route";
import authRoute from "./auth.route";
import profileRoute from "./profile.route";
import adminRoute from "./admin.route";

import {
  AuthenticationMiddleware,
  AuthorizationMiddleware,
} from "../middleware/authMiddleware";

const router = express.Router();

router.use("/users", AuthenticationMiddleware, userRoute);
router.use("/meals", AuthenticationMiddleware, mealRoute);
router.use("/profile", AuthenticationMiddleware, profileRoute);
router.use("/auth", authRoute);
router.use("admin", adminRoute);

export default router;
