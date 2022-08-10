import services from "../services";
import { getBcryptValue } from "../utils/bcrypt";
import CustomError from "../utils/CustomError";
class UserController {
  async createUser(req, res, next) {
    try {
      const { password, ...rest } = req.body;
      const hashedPassword = await getBcryptValue(password);
      const newUser = await services.User.createUser({
        password: hashedPassword,
        role: "GENERAL",
        ...rest,
      });
      const { password: _password, ...newRest } = newUser._doc;
      res.status(201).json(newRest);
    } catch (error) {
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
      const { password, ...rest } = result._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const result = await services.User.updateUserById(
        req.params.id,
        req.body
      );
      const { password, ...rest } = result._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async setAdminById(req, res, next) {
    try {
      const result = await services.User.updateUserById(
        req.params.id,
        req.body
      );
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
