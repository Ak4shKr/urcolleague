import express, { Application } from "express";
import { PORT } from "./constants/env/env";
import { dbConfig } from "./config/db-config";
import authRouter from "./routes/auth-route";
import adminRouter from "./routes/admin-route";
const app: Application = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

dbConfig();

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
