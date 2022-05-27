import models from "../models";
import { getBcryptValue } from "../services/utils/bcrypt";
import CustomError from "../services/utils/CustomError";
class UserController {
  async createUser(req, res, next) {
    try {
      const hashedPassword = await getBcryptValue(req.body.password);
      req.body.password = hashedPassword;
      const newUser = new models.User(req.body);
      await newUser.save();
      const { password, ...rest } = newUser._doc;
      res.status(201).json(rest);
    } catch (error) {
      console.log(error)
      return next(CustomError.InternalServerError(error));
    }
  }
  async getAllUsers(req, res, next) {
    try {
      const result = await models.User.find().select({ password: 0 });
      res.status(200).json(result);
    } catch (error) {}
  }

  async deleteUserById(req, res, next) {
    try {
      const result = await models.User.deleteOne({ _id: req.params.id });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const result = await models.User.findByIdAndUpdate(req.params.id, req.body,{new:true});
      const {password,...rest} = result._doc
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async deleteUserById(req, res, next) {
    try {
      const result = await models.User.findByIdAndDelete(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
