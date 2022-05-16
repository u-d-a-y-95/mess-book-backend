class UserController {
    async createUser (req,res,next){
        res.json(req.body)
    }
}


export default new UserController()