import { Request, Response, NextFunction } from "express";
import User from "../../../models/user-model";

export const allUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await User.find();
  return res.status(200).json({ message: "All users", data: users });
};
