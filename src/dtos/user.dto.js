import * as zod from "zod";

const userCreateDto = zod
  .object({
    name: zod.string("required").min(4, "At least 4 characters are required"),
    email: zod.string().email().optional(),
    mobile: zod.string().min(11,"Valid mobile number is required"),
    gender: zod.object(
      {
        value: zod.number().int().positive(),
        label: zod.string(),
      },
      "Gender is required"
    ),
    password: zod.string().min(3, "At least 3 characters are required"),
    confirmPassword: zod.string(),
  })
  .refine((obj) => obj.password === obj.confirmPassword, {
    message: "Confirm password should be equal",
    path: ["confirmPassword"],
  })
  .transform((obj) => ({
    name: obj.name,
    email: obj.email,
    mobile: obj.mobile,
    gender: obj.gender,
    password: obj.password,
  }));

const userUpdateDto = zod
  .object({
    name: zod.string("required").min(4, "At least 4 characters are required"),
    email: zod.string().email().optional(),
    mobile: zod.string().min(11,"Valid mobile number is required"),
    gender: zod.object(
      {
        value: zod.number().int().positive(),
        label: zod.string(),
      },
      "Gender is required"
    ),
  })
  .transform((obj) => ({
    name: obj.name,
    email: obj.email,
    mobile: obj.mobile,
    gender: obj.gender,
  }));

export default {
  userCreateDto,
  userUpdateDto
};
