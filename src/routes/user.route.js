import express  from "express";
import validatorMiddleware from "../services/middleware/validatorMiddleware";
import dto from "../dtos"
import controller from "../controllers"

const router = express.Router()


router.get("/",(req,res)=>{
    res.json({name:"uday"})
})

router.post("/",validatorMiddleware(dto.userDto.userCreateDto),controller.User.createUser)


export default router