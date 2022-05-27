import CustomError from "../utils/CustomError";

export default function (schema) {
  return async (req, res, next) => {
    try {
      const data = await schema.parseAsync(req.body);
      req.body = data;
      next();
    } catch (error) {
      const err = Object.entries(error.flatten().fieldErrors).reduce(
        (acc, item) => {
          acc[item[0]] = item[1].join(" . ");
          return acc;
        },
        {}
      );
      next(CustomError.ValidationError(err));
    }
  };
}
