import * as zod from "zod";

const loginDto = zod
  .object({
    workSpaceEmail: zod.string().email(),
    mobile: zod.string().min(11, "Valid mobile number is required"),
    password: zod.string().min(3, "At least 3 characters are required"),
  })
  .transform((obj) => ({
    email: obj.workSpaceEmail,
    mobile: obj.mobile,
    password: obj.password,
  }));

const signupDto = zod
  .object({
    workSpaceName: zod.string("required"),
    workSpaceEmail: zod.string().email(),
    name: zod.string(),
    mobile: zod.string().min(11, "Valid mobile number is required"),
    password: zod.string().min(3, "At least 3 characters are required"),
    confirmPassword: zod.string(),
  })
  .refine((obj) => obj.password === obj.confirmPassword, {
    message: "Confirm password should be equal",
    path: ["confirmPassword"],
  })
  .transform((obj) => ({
    workSpaceName: obj.workSpaceName,
    workSpaceEmail: obj.workSpaceEmail,
    name: obj.name,
    mobile: obj.mobile,
    password: obj.password,
  }));

export default {
  loginDto,
  signupDto,
};
