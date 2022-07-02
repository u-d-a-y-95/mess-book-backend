import services from "../services";
import { isBcryptMatch } from "../utils/bcrypt";
import CustomError from "../utils/CustomError";
import { getJWT } from "../utils/jwt";
class AuthController {
  async loginUser(req, res, next) {
    try {
      const user = await services.User.getUserByMobile(req.body.mobile);

      if (!user) {
        return next(CustomError.UnauthorizedError());
      }

      const isMatch = await isBcryptMatch(req.body.password, user.password);
      if (!isMatch) {
        return next(CustomError.UnauthorizedError());
      }
      const { password, ...rest } = user._doc;
      const token = await getJWT(rest);

      res.status(200).json({
        ...rest,
        token,
      });
    } catch (error) {
      return next(CustomError.InternalServerError(error));
    }
  }
}

export default new AuthController();
