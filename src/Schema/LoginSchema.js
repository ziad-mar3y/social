import * as zod from "zod";

export const Loginscheme = zod
  .object({
  
    email: zod
      .string()
      .nonempty("must fill the field")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalied Email"
      ),
    password: zod
      .string()
      .nonempty("must fill the field")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "must be contain Minimum eight characters, at least one letter, one number and one special character"
      ),
   
  })
