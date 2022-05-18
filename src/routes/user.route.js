import express  from "express";
import validatorMiddleware from "../services/middleware/validatorMiddleware";
import dto from "../dtos"
import controller from "../controllers"

const router = express.Router()


router.get("/",controller.User.getAllUsers)

router.post("/",validatorMiddleware(dto.userDto.userCreateDto),controller.User.createUser)


export default router