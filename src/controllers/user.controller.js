import services from "../services";
import { socketUsers } from "../socket";
import { getBcryptValue } from "../utils/bcrypt";
import CustomError from "../utils/CustomError";
class UserController {
  async createUser(req, res, next) {
    try {
      const { password, ...rest } = req.body;
      const { accountId } = req.user;
      const hashedPassword = await getBcryptValue(password);
      const newUser = await services.User.createOne({
        accountId,
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
    const { accountId } = req.user;
    try {
      const result = await services.User.get(
        { accountId },
        {
          select: { password: 0 },
          sort: { createdAt: -1 },
        }
      );
      res.status(200).json(result);
    } catch (error) {
      next(CustomError.InternalServerError(error));
    }
  }
  async getAllUsersDDL(req, res, next) {
    try {
      const { accountId } = req.user;
      const result = await services.User.get(
        {
          accountId,
        },
        {
          select: {
            _id: 1,
            name: 1,
          },
        }
      );
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
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const result = await services.User.getOne(
        {
          accountId,
          _id,
        },
        {
          select: {
            password: 0,
          },
        }
      );
      if (!result) {
        return next(CustomError.NotFoundError());
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const result = await services.User.updateOne(
        {
          accountId,
          _id,
        },
        req.body,
        {
          select: {
            password: 0,
          },
        }
      );
      const { password, ...rest } = result._doc;
      req.io.to(socketUsers[rest._id]).emit("changeProfile", rest);
      res.status(200).json(rest);
    } catch (error) {
      console.next(error);
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
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const result = await services.User.deleteOne(
        { accountId, _id, role: { $nin: ["ADMIN"] } },
        { select: { password: 0 } }
      );
      if (result.profileImage) {
        services.User.unlinkProfileImage(result.profileImage);
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
