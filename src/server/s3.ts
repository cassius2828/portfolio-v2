import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { env } from "~/env";

// Initialize S3 client
const s3Client = new S3Client({
  region: env.AWS_REGION ?? "us-west-1",
  credentials:
    env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

/**
 * Get a presigned URL for uploading a file to S3
 */
export async function getUploadPresignedUrl(
  fileName: string,
  contentType: string,
  folder = "portfolio/uploads",
) {
  if (!env.S3_BUCKET_NAME) {
    throw new Error("S3_BUCKET_NAME is not configured");
  }

  const key = `${folder}/${uuidv4()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600, // 1 hour
  });

  const publicUrl = env.CLOUDFRONT_URL
    ? `${env.CLOUDFRONT_URL}/${key}`
    : `https://${env.S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;

  return {
    presignedUrl,
    publicUrl,
    key,
  };
}

/**
 * Upload a file buffer directly to S3
 */
export async function uploadFile(
  buffer: Buffer,
  fileName: string,
  contentType: string,
  folder = "portfolio/uploads",
) {
  if (!env.S3_BUCKET_NAME) {
    throw new Error("S3_BUCKET_NAME is not configured");
  }

  const key = `${folder}/${uuidv4()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  const publicUrl = env.CLOUDFRONT_URL
    ? `${env.CLOUDFRONT_URL}/${key}`
    : `https://${env.S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;

  return {
    publicUrl,
    key,
  };
}

/**
 * Upload a base64 encoded image to S3
 */
export async function uploadBase64Image(
  base64Data: string,
  fileName: string,
  folder = "portfolio/blog-images",
) {
  if (!env.S3_BUCKET_NAME) {
    throw new Error("S3_BUCKET_NAME is not configured");
  }

  // Extract the base64 data (remove data:image/...;base64, prefix)
  const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid base64 image format");
  }

  const contentType = matches[1]!;
  const buffer = Buffer.from(matches[2]!, "base64");

  return uploadFile(buffer, fileName, contentType, folder);
}

/**
 * Delete a file from S3
 */
export async function deleteFile(key: string) {
  if (!env.S3_BUCKET_NAME) {
    throw new Error("S3_BUCKET_NAME is not configured");
  }

  const command = new DeleteObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

export { s3Client };

