import { isVerify } from "../utils/jwt";

export default async function (req, res, next) {
  try {
    const {authorization} = req.headers;
    if (!authorization) {
      res.status(401).json("Unauthorized");
    }
    const token = authorization.split(" ")[1];
    const decoded = await isVerify(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json("Unauthorized");
  }
}
