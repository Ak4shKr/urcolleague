import { z } from "zod";

// Zod validation schema
export const userRegisterValidation = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  gender: z.string(),
});

export const userLoginValidation = z.object({
  email: z.string().email("Invalid email type"),
  password: z.string().min(6, "min length of password is 5"),
});
