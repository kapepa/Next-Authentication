import { UserRole } from "@prisma/client";
import { z } from "zod";

const SettingSchema = z.object({
  name: z.optional(
    z
      .string({ invalid_type_error: "name should be a string" })
      .min(3, { message: "Minimus 6 characters required" })
  ),
  isTwoFactorEnabled: 
    z.optional(z.boolean()),
  role: 
    z.optional(z.enum([UserRole.ADMIN, UserRole.USER]),),
  email: z.optional(
    z
      .string({ invalid_type_error: "Email should be a string" })
      .email({ message: "Email is required" })
  ),
  password: z.optional(
    z
      .string()
      .min(6,{ message: "password is required"})
  ),
  newPassword: z.optional(
    z
      .string()
      .min(6,{ message: "password is required"})
  ),
})
  .refine((data) => {
    if(data.password && !data.newPassword) return false;
    if(data.newPassword && !data.password) return false;

    return true;
  }, {
    message: "Passwords is required!",
    path: ["newPasswords"],
  })
  .refine((data) => {
    if(data.newPassword && !data.password) return false;

    return true;
  }, {
    message: "Passwords is required!",
    path: ["password"],
  });

const ResetSchema = z.object({
  email: z
  .string({ invalid_type_error: "Email should be a string" })
  .email({ message: "Email is required" })
});

const NewPasswordSchema = z.object({
  password: z
  .string({ invalid_type_error: "password should be a string" })
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



export { LoginSchema, RegistrationSchema, ResetSchema, NewPasswordSchema, SettingSchema }