import { JwtPayload, sign } from "jsonwebtoken";
import { JWT_SECRET, JWT_SECRET_REFRESH } from "../constants/env/env";

export const generateAccessToken = (payload: JwtPayload) => {
  return sign(payload, JWT_SECRET!, { expiresIn: "2d" });
};

export const generateRefreshToken = (payload: JwtPayload) => {
  return sign(payload, JWT_SECRET_REFRESH!, { expiresIn: "7d" });
};
