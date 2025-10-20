import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { env } from "~/env";

export const client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadFile = async (
  file: Buffer,
  type: `${string}/${string}`,
  key: string,
) => {
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
    Body: file,
    ContentType: type,
  });

  const data = await client.send(command);
  if (data.$metadata.httpStatusCode !== 200) {
    throw new Error("Failed to upload file");
  }
  return data;
};

export const listFiles = async (prefix?: string) => {
  const command = new ListObjectsCommand({
    Bucket: env.S3_BUCKET,
    Prefix: prefix,
  });

  const data = await client.send(command);
  if (data.$metadata.httpStatusCode !== 200) {
    throw new Error("Failed to list files");
  }
  return data.Contents;
};

export const getFile = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
  });

  const data = await client.send(command);
  if (data.$metadata.httpStatusCode !== 200) {
    throw new Error("Failed to get file");
  }
  return data.Body;
};

export const deleteFile = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
  });

  const data = await client.send(command);
  if (data.$metadata.httpStatusCode !== 204) {
    throw new Error("Failed to delete file");
  }
  return data;
};
