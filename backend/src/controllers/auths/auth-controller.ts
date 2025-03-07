import User from "../../models/user-model";
import { Request, Response, NextFunction } from "express";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../../validation/zod-validation";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt-token";
import { ENV } from "../../constants/env/env";
import { sendMail } from "../../config/smtp-config";
import { userRegisterOTP } from "../../constants/messages/auth-messages";
import { generateOTP } from "../../utils/otp-generate";

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestBody = userRegisterValidation.safeParse(req.body);
    if (!requestBody.success) {
      return res.status(400).json({
        message: "Validation failed",
        data: requestBody.error.errors,
      });
    }
    const { fullName, email, password } = requestBody.data!;
    let { gender } = requestBody.data!;
    gender = gender.toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      gender,
    });
    const resUser = newUser.toObject();
    delete resUser.password;

    sendMail(
      email,
      "Registration OTP for Nestays",
      userRegisterOTP(fullName, generateOTP().toString())
    );

    return res
      .status(201)
      .json({ message: "User created successfully", data: resUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const requestBody = userLoginValidation.safeParse(req.body);
    if (!requestBody.success) {
      return res.status(400).json({
        message: "Validation failed",
        data: requestBody.error.errors,
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found !" });
    }
    const isPasswordMatch = password === user.password;
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password !" });
    }
    const accessToken = await generateAccessToken({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    });
    const refreshToken = await generateRefreshToken({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    });

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const resUser = {
      email: user.email,
      fullName: user.fullName,
    };
    return res.status(200).json({
      message: "User logged in",
      data: { token: accessToken, user: resUser },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error !" });
    next(error);
  }
};
