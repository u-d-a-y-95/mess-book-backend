import models from "../models";
import { getBcryptValue } from "../utils/bcrypt";
import CustomError from "../utils/CustomError";
class User {
  async createUser(user) {
    try {
      const newUser = new models.User(user);
      return newUser.save();
    } catch (error) {
      //   console.log(error);
      //   return next(CustomError.InternalServerError(error));
    }
  }
  async getAllUsers(req, res, next) {
    try {
      const result = await models.User.find().select({ password: 0 });
      return result;
    } catch (error) {}
  }
  async getAllUsersDDL(req, res, next) {
    try {
      const result = await models.User.find().select({ _id: 1, name: 1 });
      res.status(200).json(
        result.map((item) => ({
          value: item._id,
          label: item.name,
        }))
      );
    } catch (error) {}
  }

  async getUserById(id) {
    try {
      return models.User.findById(id);
    } catch (error) {}
  }

  async updateUserById(id, data) {
    try {
      return models.User.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteUserById(id) {
    try {
      return models.User.findByIdAndDelete(id);
    } catch (error) {
      next(error);
    }
  }
}

export default new User();
