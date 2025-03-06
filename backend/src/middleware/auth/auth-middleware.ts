import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../constants/env/env";
import { Request, Response, NextFunction } from "express";

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
        req.body.user = decoded.id;
      } else {
        req.body.user = null;
      }
      next();
    }
  });
};
