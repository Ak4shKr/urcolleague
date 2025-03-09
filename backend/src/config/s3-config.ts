import { S3Client } from "@aws-sdk/client-s3";
import {
  AWS_ACCESS_KEY as accessKeyId,
  AWS_SECRET_ACCESS_KEY as secretAccessKey,
  AWS_REGION as region,
} from "../constants/env/env";

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not defined");
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

export { s3Client };
