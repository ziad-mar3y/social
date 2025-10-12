import * as zod from "zod";

export const scheme = zod
  .object({
    name: zod
      .string()
      .nonempty("must fill the field")
      .min(3, "at leatest 3 charachter")
      .max(20, "at most 20 character"),
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
    rePassword: zod.string().nonempty("must fill the field"),

    dateOfBirth: zod.coerce.date().refine(
      (date) => {
        const birthDate = date.getFullYear();
        const now = new Date().getFullYear();
        const age = now - birthDate;
        return age >= 18;
      },
      { message: "you must e at leatest 18 years old" }
    ),
    gender: zod.string()
    .nonempty("must fill the field")
    .regex(/^(male|female)$/ , "enter valid gender")
  })
  .refine((data) => data.password == data.rePassword, {
    message: "should match the password",
    path: ["rePassword"],
  });