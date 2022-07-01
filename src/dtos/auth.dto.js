import * as zod from "zod";

const loginDto = zod
  .object({
    mobile: zod.string().min(11,"Valid mobile number is required"),
    password: zod.string().min(3, "At least 3 characters are required"),
  })
  .transform((obj) => ({
    mobile: obj.mobile,
    password: obj.password,
  }));

  export default {
    loginDto,
  };
  
