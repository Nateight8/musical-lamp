import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;

export const AuthRegisterationValidator = z.object({
  email: z.string().min(2, {
    message: "Product name is required.",
  }),
  fullName: z.string().min(2, {
    message: "Product name is required.",
  }),
  password: z.string().min(2, {
    message: "Product description is required.",
  }),
});

export type TAuthRegisterationValidator = z.infer<
  typeof AuthRegisterationValidator
>;
