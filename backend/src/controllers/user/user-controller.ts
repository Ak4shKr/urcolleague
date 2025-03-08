import User from "../../models/user-model";
import { Request, Response, NextFunction } from "express";

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, profileData } = req.body;
    const user = await User.findByIdAndUpdate(userId, profileData, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};
