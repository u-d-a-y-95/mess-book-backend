import CustomError from "../utils/CustomError";
import { isVerify } from "../utils/jwt";

export const AuthenticationMiddleware = async (req, res, next) => {
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
};

export const AuthorizationMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        if (roles.includes("OWN")) {
          if (req.params.id === req.user._id) {
            return next();
          }
        }
        return next(CustomError.UnauthorizedError());
      }
    } catch (error) {
      next(CustomError.InternalServerError(error));
    }
  };
};
