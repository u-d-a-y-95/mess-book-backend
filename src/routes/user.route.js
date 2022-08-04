import express  from "express";
import payloadValidator from "../middleware/payloadValidator";
import dto from "../dtos"
import controller from "../controllers"

const router = express.Router()


router.get("/",controller.User.getAllUsers)

router.get("/ddl",controller.User.getAllUsersDDL)

router.get("/:id",controller.User.getUserById)

router.post("/",payloadValidator(dto.User.userCreateDto),controller.User.createUser)

router.patch("/:id",payloadValidator(dto.User.userUpdateDto),controller.User.updateUserById)

router.patch("/admin/:id",controller.User.setAdminById)

router.delete("/:id",controller.User.deleteUserById)



export default router