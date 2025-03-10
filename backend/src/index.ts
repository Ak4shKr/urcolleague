import express, { Application } from "express";
import { PORT } from "./constants/env/env";
import { dbConfig } from "./config/db-config";
import authRouter from "./routes/users/auth-route";
import adminRouter from "./routes/admin/admin-route";
import userRouter from "./routes/users/users-route";
import { errorHandler } from "./middleware/error/error-handlers";
import multer from "multer";
import { s3Client } from "./config/s3-config";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const app: Application = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

dbConfig();
const upload = multer({ storage: multer.memoryStorage() });

export async function uploadFile({
  fileBuffer,
  fileName,
  mimetype,
}: {
  fileBuffer: Buffer;
  fileName: string;
  mimetype: string;
}) {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `images/${fileName}`,
    Body: fileBuffer,
    ContentType: mimetype,
  };

  return s3Client.send(new PutObjectCommand(uploadParams));
}

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  console.log("file", file);
  if (!file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  try {
    const response = await uploadFile({
      fileBuffer: file.buffer,
      fileName: file.originalname,
      mimetype: file.mimetype,
    });
    console.log(response);
    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file.");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
