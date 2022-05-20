import bcrypt from "bcrypt";

export const getBcryptValue = (value, saltRounds = +process.env.SALT_ROUND) => {
  return bcrypt.hash(value, saltRounds);
};

export const isBcryptMatch = (value, hash) => {
  return bcrypt.compare(value, hash);
};
