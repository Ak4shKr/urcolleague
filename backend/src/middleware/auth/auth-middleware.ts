import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../constants/env/env";
import { Request, Response, NextFunction } from "express";
import User from "../../models/user-model";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  jwt.verify(token as string, JWT_SECRET!, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).send({
        message: "Auth failed",
        success: false,
      });
      return;
    } else {
      if (typeof decoded !== "string" && decoded?.id) {
        req.body.userId = decoded.id;
      } else {
        req.body.user = null;
      }
      next();
    }
  });
};

export const adminRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.body.userId;
  if (!userId) {
    res.status(403).json({ message: "User not found!" });
    return;
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(403).json({ message: "User not found!" });
    return;
  }
  if (user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not accessible." });
  }
};
