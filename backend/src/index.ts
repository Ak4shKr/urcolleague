import express, { Application } from "express";
import { PORT } from "./constants/env";
import { dbConfig } from "./config/db-config";
import authRouter from "./routes/auth-route";
const app: Application = express();
app.use(express.json());

app.use("/auth", authRouter);

dbConfig();

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
