import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Cloudflare R2 helpers (S3-compatible). Server-side only: the credentials must
 * never reach the browser, so none of the variables use the NEXT_PUBLIC_ prefix.
 * The browser only ever receives short-lived presigned URLs.
 */

export const DEFAULT_URL_EXPIRY_SECONDS = 300;

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
}

const ENV_NAMES: Record<keyof R2Config, string> = {
  accountId: "R2_ACCOUNT_ID",
  accessKeyId: "R2_ACCESS_KEY_ID",
  secretAccessKey: "R2_SECRET_ACCESS_KEY",
  bucket: "R2_BUCKET",
};

export function getR2Config(env: Record<string, string | undefined> = process.env): R2Config {
  const missing = (Object.keys(ENV_NAMES) as (keyof R2Config)[])
    .filter((key) => !env[ENV_NAMES[key]])
    .map((key) => ENV_NAMES[key]);

  if (missing.length > 0) {
    throw new Error(`Missing R2 environment variables: ${missing.join(", ")}`);
  }

  return {
    accountId: env.R2_ACCOUNT_ID as string,
    accessKeyId: env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY as string,
    bucket: env.R2_BUCKET as string,
  };
}

export function createR2Client(config: R2Config): S3Client {
  return new S3Client({
    region: "auto", // R2 ignores regions; "auto" is the documented value.
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

/** Builds a collision-resistant, URL-safe object key such as "uploads/1730000000000-my-photo.png". */
export function buildObjectKey(folder: string, filename: string, now: number = Date.now()): string {
  const safeName = filename
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const safeFolder = folder.replace(/^\/+|\/+$/g, "");
  return `${safeFolder}/${now}-${safeName || "file"}`;
}

/** Presigned PUT URL so the browser can upload straight to R2. */
export async function createUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = DEFAULT_URL_EXPIRY_SECONDS
): Promise<string> {
  const config = getR2Config();
  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(createR2Client(config), command, { expiresIn });
}

/** Presigned GET URL for reading a private object. */
export async function createDownloadUrl(
  key: string,
  expiresIn: number = DEFAULT_URL_EXPIRY_SECONDS
): Promise<string> {
  const config = getR2Config();
  const command = new GetObjectCommand({ Bucket: config.bucket, Key: key });
  return getSignedUrl(createR2Client(config), command, { expiresIn });
}

export async function deleteObject(key: string): Promise<void> {
  const config = getR2Config();
  await createR2Client(config).send(
    new DeleteObjectCommand({ Bucket: config.bucket, Key: key })
  );
}
