import express, { Application } from "express";
import { PORT } from "./constants/env/env";
import { dbConfig } from "./config/db-config";
import authRouter from "./routes/users/auth-route";
import adminRouter from "./routes/admin/admin-route";
import userRouter from "./routes/users/users-route";
import { errorHandler } from "./middleware/error/error-handlers";
import { s3Config } from "./config/s3-config";
const app: Application = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

dbConfig();
s3Config();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
