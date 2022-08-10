import express from "express";
import payloadValidator from "../middleware/payloadValidator";
import dto from "../dtos";
import controller from "../controllers";

const router = express.Router();

router.post(
  "/login",
  payloadValidator(dto.Auth.loginDto),
  controller.Auth.loginUser
);
router.post(
  "/signup",
  payloadValidator(dto.Auth.signupDto),
  controller.Auth.signupUser
);

export default router;
