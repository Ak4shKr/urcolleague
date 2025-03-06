import { Request, Response, NextFunction } from "express";
import User from "../models/user-model";

export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "All users", data: users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};
