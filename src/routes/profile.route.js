import express from "express";
import payloadValidator from "../middleware/payloadValidator";
import dto from "../dtos";
import controller from "../controllers";

const router = express.Router();

router.get("/:id", controller.Profile.getUserById);

router.patch(
  "/:id",
//   payloadValidator(dto.User.userUpdateDto),
  controller.Profile.updateUserById
);


export default router;
