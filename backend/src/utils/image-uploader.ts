import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import { s3Client } from "../config/s3-config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const upload = multer({ storage: multer.memoryStorage() });
const bucketName = process.env.AWS_BUCKET_NAME;

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
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
  };

  return s3Client.send(new PutObjectCommand(uploadParams));
}

export async function getObjectSignedUrl(key: any) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  const seconds = 60;
  const url = await getSignedUrl(s3Client, command, {
    expiresIn: seconds,
  });

  return url;
}
