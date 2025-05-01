import express, { Application } from "express";
import { PORT } from "./constants/env/env";
import { dbConfig } from "./config/db-config";
import authRouter from "./routes/auth/auth-route";
import adminRouter from "./routes/admin/admin-route";
import userRouter from "./routes/users/users-route";
import { errorHandler } from "./middleware/error/error-handlers";
const rateLimit = require("express-rate-limit");

const app: Application = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

dbConfig();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
