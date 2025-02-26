import { configDotenv } from "dotenv";
configDotenv();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;
export const ENV = process.env.ENV;
export const LOCAL_BACKEND = process.env.LOCAL_BACKEND;
export const LOCAL_FRONTEND = process.env.LOCAL_FRONTEND;
