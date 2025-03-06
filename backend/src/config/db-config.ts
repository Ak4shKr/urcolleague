import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env/env";

export const dbConfig = async () => {
  await mongoose
    .connect(MONGO_URI || "")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB: ", error);
    });
};
