import models from "../models";
class UserController {
  async createUser(req, res, next) {
    const newUser = new models.User(req.body);
    newUser.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(req.body);
    });
  }
  async getAllUsers(req, res, next) {
    const result = await models.User.find();
    res.status(200).json(result);
  }
}

export default new UserController();
