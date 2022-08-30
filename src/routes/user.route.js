import express from "express";
import payloadValidator from "../middleware/payloadValidator";
import dto from "../dtos";
import controller from "../controllers";
import { AuthorizationMiddleware } from "../middleware/authMiddleware";


const router = express.Router();

router.get("/", controller.User.getAllUsers);

router.get(
  "/ddl",
  AuthorizationMiddleware(["ADMIN"]),
  controller.User.getAllUsersDDL
);

router.get("/:id", controller.User.getUserById);

router.post(
  "/",
  AuthorizationMiddleware(["ADMIN"]),
  payloadValidator(dto.User.userCreateDto),
  controller.User.createUser
);

router.patch(
  "/:id",
  AuthorizationMiddleware(["ADMIN"]),
  payloadValidator(dto.User.userUpdateDto),
  controller.User.updateUserById
);
router.patch(
  "/:id/changeRole",
  AuthorizationMiddleware(["ADMIN"]),
  payloadValidator(dto.User.changeUserRoleDto),
  controller.User.updateUserById
);



router.patch("/admin/:id", controller.User.setAdminById);

router.delete(
  "/:id",
  AuthorizationMiddleware(["ADMIN"]),
  controller.User.deleteUserById
);

export default router;
