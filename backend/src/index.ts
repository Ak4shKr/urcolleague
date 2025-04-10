import express, { Application } from "express";
import { PORT } from "./constants/env/env";
import { dbConfig } from "./config/db-config";
import authRouter from "./routes/auth/auth-route";
import adminRouter from "./routes/admin/admin-route";
import userRouter from "./routes/users/users-route";
import { errorHandler } from "./middleware/error/error-handlers";

const app: Application = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

dbConfig();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
