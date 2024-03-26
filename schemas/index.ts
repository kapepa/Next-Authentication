import { z } from "zod";

const ResetSchema = z.object({
  email: z
  .string({ invalid_type_error: "Email should be a string" })
  .email({ message: "Email is required" })
});

const NewPasswordSchema = z.object({
  password: z
  .string({ invalid_type_error: "Email should be a string" })
  .min(6, { message: "Minimus 6 characters required" })
});

const LoginSchema = z.object({
  email: z.string(
    { invalid_type_error: "Email should be a string" }
  ).email(
    { message: "Email is required" }
  ),
  password: z.string().min(1,{
    message: "password is required"
  }),
  code: z.optional(z.string())
});

const RegistrationSchema = z.object({
  email: z.string(
    { invalid_type_error: "Email should be a string" }
  ).email(
    { message: "Email is required" }
  ),
  password: z.string().min(6,{
    message: "Minimus 6 characters required"
  }),
  name: z.string().min(3,{
    message: "Name is required"
  })
});



export { LoginSchema, RegistrationSchema, ResetSchema, NewPasswordSchema }