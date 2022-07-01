var jwt = require("jsonwebtoken");

export const getJWT = (data, secret) => {
  return jwt.sign(data, "shhhhh");
};
export const isVerify = (data, secret) => {
  return jwt.verify(data, "shhhhh");
};
