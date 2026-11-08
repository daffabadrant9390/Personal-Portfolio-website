// Smoke test for the Cloudflare R2 connection: upload -> read back -> delete.
// Usage (loads variables from the env file of the environment you are testing):
//   node --env-file=.env scripts/r2-smoke.mjs
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;

const missing = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET"].filter(
  (name) => !process.env[name]
);
if (missing.length > 0) {
  console.error(`Missing variables: ${missing.join(", ")}`);
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

const key = `smoke-test/${Date.now()}.txt`;
const body = `hello from ${R2_BUCKET}`;

await client.send(
  new PutObjectCommand({ Bucket: R2_BUCKET, Key: key, Body: body, ContentType: "text/plain" })
);
console.log("1/3 upload ok:", key);

const url = await getSignedUrl(client, new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }), {
  expiresIn: 60,
});
const text = await (await fetch(url)).text();
if (text !== body) {
  console.error("2/3 read back MISMATCH:", text);
  process.exit(1);
}
console.log("2/3 presigned read ok");

await client.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key }));
console.log("3/3 delete ok - R2 is working for bucket", R2_BUCKET);
