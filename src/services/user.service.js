import models from "../models";
import { getBcryptValue } from "../utils/bcrypt";
import CustomError from "../utils/CustomError";
class User {
  async createUser(user) {
    try {
      const newUser = new models.User(user);
      return newUser.save();
    } catch (error) {
    }
  }
  async getAllUsers(req, res, next) {
    try {
      const result = await models.User.find().select({ password: 0 }).sort({createdAt:-1});
      return result;
    } catch (error) {}
  }
  async getAllUsersDDL() {
    try {
      return models.User.find().select({ _id: 1, name: 1 });
    } catch (error) {}
  }

  async getUserById(id) {
    try {
      return models.User.findById(id);
    } catch (error) {}
  }

  async getUserByFilter(filter) {
    try {
      return models.User.findOne(filter);
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
