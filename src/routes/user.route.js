import express  from "express";
import payloadValidator from "../services/middleware/payloadValidator";
import dto from "../dtos"
import controller from "../controllers"

const router = express.Router()


router.get("/",controller.User.getAllUsers)

router.get("/:id",controller.User.getUserById)

router.post("/",payloadValidator(dto.userDto.userCreateDto),controller.User.createUser)

router.patch("/:id",payloadValidator(dto.userDto.userUpdateDto),controller.User.updateUserById)

router.delete("/:id",controller.User.deleteUserById)


export default router