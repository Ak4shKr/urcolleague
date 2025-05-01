import User from "../../models/user/user-model";
import { Request, Response, NextFunction } from "express";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../../validation/zod-validation";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt-token";
import {
  ENV,
  googleClientId,
  googleClientSecret,
  googleRedirectUrl,
} from "../../constants/env/env";
import { sendMail } from "../../config/smtp-config";
import { userRegisterOTP } from "../../constants/messages/register-email";
import { generateOTP } from "../../utils/otp-generate";
import UserPreference from "../../models/user/user-preference";
import axios from "axios";

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const requestBody = userRegisterValidation.safeParse(req.body);
  if (!requestBody.success) {
    return res.status(400).json({
      message: "Validation failed",
      data: requestBody.error.errors,
    });
  }
  const { name, email, password } = requestBody.data!;
  let { gender } = requestBody.data!;
  gender = gender.toLowerCase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const newUser = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    gender,
  });

  await UserPreference.create({
    user_id: newUser._id,
  });

  const resUser = newUser.toObject();
  delete resUser.password;

  sendMail(
    email,
    "Registration OTP for Nestays",
    userRegisterOTP(name, generateOTP().toString())
  );

  return res
    .status(201)
    .json({ message: "User created successfully", data: resUser });
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, password } = req.body;
  const requestBody = userLoginValidation.safeParse(req.body);
  if (!requestBody.success) {
    return res.status(400).json({
      message: "Validation failed",
      data: requestBody.error.errors,
    });
  }
  const user = await User.findOne({ email: email.toLowerCase() });
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
    fullName: user.name,
  });
  const refreshToken = await generateRefreshToken({
    id: user._id,
    email: user.email,
    fullName: user.name,
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
    name: user.name,
  };
  return res.status(200).json({
    message: "User logged in",
    data: { token: accessToken, user: resUser },
  });
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId, oldPassword, newPassword } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.password !== oldPassword) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }
  const updatedPassword = await User.findByIdAndUpdate(
    userId,
    { password: newPassword },
    { new: true }
  );
  return res
    .status(200)
    .json({ message: "Password updated successfully!", data: updatedPassword });
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const otp = generateOTP();
  sendMail(email, "Password Reset OTP", `Your OTP is ${otp}`);
  await User.findByIdAndUpdate(user._id, { OTP: otp }, { new: true });
  return res.status(200).json({ message: "OTP sent to your email" });
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, OTP } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.OTP !== OTP) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  await User.findByIdAndUpdate(user._id, { OTP: null }, { new: true });
  return res.status(200).json({ message: "OTP verified successfully" });
};

export const setNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { password: newPassword },
    { new: true }
  );
  return res
    .status(200)
    .json({ message: "Password updated successfully", data: updatedUser });
};

export const googleAuth = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "No code provided" });

  const tokenResponse = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      redirect_uri: googleRedirectUrl,
      grant_type: "authorization_code",
    }
  );
  const { access_token } = tokenResponse.data;
  if (!access_token)
    return res.status(400).json({ error: "No access token received" });

  const userInfo = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const user = userInfo.data;
  return res
    .status(200)
    .json({ access_token, user, message: "Google Auth Success" });
};
