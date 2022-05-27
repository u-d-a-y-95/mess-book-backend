import { ZodError } from "zod";

export default function (err, req, res, next) {
  return res.status(err.status).json(err);
}
