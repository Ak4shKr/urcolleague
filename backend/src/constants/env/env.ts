import { configDotenv } from "dotenv";
configDotenv();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;
export const ENV = process.env.ENV;
export const LOCAL_BACKEND = process.env.LOCAL_BACKEND;
export const LOCAL_FRONTEND = process.env.LOCAL_FRONTEND;
export const BREVO_SMTP_KEY = process.env.BREVO_SMTP_KEY;
export const BREVO_SMTP_SERVER = process.env.BREVO_SMTP_SERVER;
export const BREVO_SMTP_PORT = process.env.BREVO_SMTP_PORT;
export const BREVO_SMTP_LOGIN = process.env.BREVO_SMTP_LOGIN;
export const BREVO_USER = process.env.BREVO_USER;

export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
