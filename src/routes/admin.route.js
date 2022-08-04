import express  from "express";
import controller from "../controllers"

const router = express.Router()


router.get("/",controller.User.getAllUsers)
router.get("/:id",controller.User.getUserById)
router.post("/",controller.User.createUser)
router.patch("/:id",controller.User.updateUserById)
router.delete("/:id",controller.User.deleteUserById)



export default router