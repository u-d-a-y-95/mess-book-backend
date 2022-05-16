import * as zod from "zod";

const userCreateDto = zod
  .object({
    name: zod.string("required").min(4, "At least 4 characters are required"),
    email: zod.string().email().optional(),
    mobile: zod.string().min(11),
    gender: zod
      .object({
        value:zod.number().int().positive(),
        label:zod.string()
      },"Gender is required"),
    password: zod.string().min(3, "At least 3 characters are required"),
    confirmPassword: zod.string(),
  })
  .refine((obj) => obj.password === obj.confirmPassword, {
    message: "Confirm password should be equal",
    path: ["confirmPassword"],
  });

export default {
  userCreateDto,
};
