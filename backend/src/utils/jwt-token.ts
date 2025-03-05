import { JwtPayload, sign } from "jsonwebtoken";
import { JWT_SECRET, JWT_SECRET_REFRESH } from "../constants/env";

export const generateAccessToken = (payload: JwtPayload) => {
  return sign(payload, JWT_SECRET!, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: JwtPayload) => {
  return sign(payload, JWT_SECRET_REFRESH!, { expiresIn: "7d" });
};
