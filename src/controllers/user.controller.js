import services from "../services";
import { getBcryptValue } from "../utils/bcrypt";
import CustomError from "../utils/CustomError";
class UserController {
  async createUser(req, res, next) {
    try {
      const hashedPassword = await getBcryptValue(req.body.password);
      req.body.password = hashedPassword;
      const newUser = await services.User.createUser(req.body);
      const { password, ...rest } = newUser._doc;
      res.status(201).json(rest);
    } catch (error) {
      console.log(error);
      return next(CustomError.InternalServerError(error));
    }
  }
  async getAllUsers(req, res, next) {
    try {
      const result = await services.User.getAllUsers(req, res, next);
      res.status(200).json(result);
    } catch (error) {}
  }
  async getAllUsersDDL(req, res, next) {
    try {
      const result = await services.User.getAllUsersDDL();
      res.status(200).json(
        result.map((item) => ({
          value: item._id,
          label: item.name,
        }))
      );
    } catch (error) {}
  }

  async getUserById(req, res, next) {
    try {
      const result = await services.User.getUserById(req.params.id);
      delete result.password;
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const result = await services.User.updateUserById(req.params.id,req.body);
      const { password, ...rest } = result._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async deleteUserById(req, res, next) {
    try {
      const result = await services.User.deleteUserById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
