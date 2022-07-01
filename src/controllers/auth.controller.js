import services from "../services";
import { getBcryptValue, isBcryptMatch } from "../utils/bcrypt";
import CustomError from "../utils/CustomError";
import { getJWT } from "../utils/jwt";
class AuthController {
  async loginUser(req, res, next) {
    try {
      const user = await services.User.getUserByMobile(req.body.mobile);
      if (!user) {
        res.status(401).json("UnAuthentic");
      }

      const isMatch = await isBcryptMatch(req.body.password, user.password);
      if (!isMatch) {
        res.status(401).json("UnAuthentic");
      }
      const { password, ...rest } = user._doc;
      const token = await getJWT(rest);
      res.status(200).json({
        ...rest,
        token,
      });
    } catch (error) {
      console.log(error);
      return next(CustomError.InternalServerError(error));
    }
  }
}

export default new AuthController();
