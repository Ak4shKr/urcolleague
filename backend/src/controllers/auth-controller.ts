import { z } from "zod";
import User from "../models/user-model";
import express, { Request, Response, NextFunction } from "express";

// Zod validation schema
const userValidation = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  gender: z.string(),
  religion: z.string(),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
});

// User registration handler
export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    const requestBody = userValidation.safeParse(req.body);
    if (!requestBody.success) {
      return res.status(400).json({
        message: "Validation failed",
      });
    }
    const { fullName, email, password, gender, religion, phone } =
      requestBody.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser !== null) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password,
      gender,
      religion,
      phone,
    });

    // Return success response
    return res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    // Pass errors to the error-handling middleware
    next(error);
  }
};

export const userLogin = () => {};
