import services from "../services";
import { getBcryptValue } from "../utils/bcrypt";
import CustomError from "../utils/CustomError";
class ProfileController {
  async getUserById(req, res, next) {
    try {
      const { accountId } = req.user;
      const { id: _id } = req.params;
      const result = await services.User.getOne(
        { accountId, _id },
        { select: { password: 0 } }
      );
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
        { accountId, _id },
        req.body,
        {
          select: { password: 0 },
        }
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController();
