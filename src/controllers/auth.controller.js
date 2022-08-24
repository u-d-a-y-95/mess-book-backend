import services from "../services";
import { getBcryptValue, isBcryptMatch } from "../utils/bcrypt";
import CustomError from "../utils/CustomError";
import { getJWT } from "../utils/jwt";
class AuthController {
  async loginUser(req, res, next) {
    try {
      const { email, mobile, password } = req.body;
      const account = await services.Account.getOne({
        email,
      });
      if (!account) {
        return next(CustomError.UnauthorizedError());
      }
      const user = await services.User.getOne({
        accountId: account._id,
        mobile,
      });
      if (!user) {
        return next(CustomError.UnauthorizedError());
      }
      const isMatch = await isBcryptMatch(password, user.password);
      if (!isMatch) {
        return next(CustomError.UnauthorizedError());
      }
      const { password: _password, ...rest } = user._doc;
      const token = await getJWT(rest);
      res.status(200).json({
        ...rest,
        token,
      });
    } catch (error) {
      console.log(error)
      return next(CustomError.InternalServerError(error));
    }
  }
  async signupUser(req, res, next) {
    try {
      const { workSpaceName, workSpaceEmail, password, ...rest } = req.body;
      const account = await services.Account.createOne({
        name: workSpaceName,
        email: workSpaceEmail,
      });
      const hashedPassword = await getBcryptValue(password);
      const user = await services.User.createOne({
        accountId: account._id,
        password: hashedPassword,
        role: "ADMIN",
        ...rest,
      });
      return res.json(user);
    } catch (error) {
      return next(CustomError.InternalServerError(error));
    }
  }
}

export default new AuthController();
