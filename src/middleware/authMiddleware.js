import CustomError from "../utils/CustomError";
import { isVerify } from "../utils/jwt";

export default async function (req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(CustomError.UnauthorizedError());
    }
    const token = authorization.split(" ")[1];
    const decoded = await isVerify(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(CustomError.InternalServerError(error));
  }
}
