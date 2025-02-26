import express from "express";
import { PORT } from "./constants/env";
import { dbConfig } from "./config/db-config";
import authRouter from "./routes/auth-route";
const app = express();
app.use(express.json());

app.use("/auth", authRouter);
// app.use("/users", userRouter);
// app.use("/properties", propertyRouter);

dbConfig();

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
