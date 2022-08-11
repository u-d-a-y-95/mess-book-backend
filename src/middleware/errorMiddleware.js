import { ZodError } from "zod";

export default function (err, req, res, next) {
  console.log(err);
  return res.status(err.status).json(err);
}
