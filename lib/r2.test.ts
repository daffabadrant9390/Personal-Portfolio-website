import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  send: vi.fn(),
  getSignedUrl: vi.fn(),
  clientOptions: [] as unknown[],
}));

vi.mock("@aws-sdk/client-s3", () => {
  class S3Client {
    constructor(options: unknown) {
      mocks.clientOptions.push(options);
    }
    send = mocks.send;
  }
  class PutObjectCommand {
    constructor(public input: unknown) {}
  }
  class GetObjectCommand {
    constructor(public input: unknown) {}
  }
  class DeleteObjectCommand {
    constructor(public input: unknown) {}
  }
  return { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand };
});

vi.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: mocks.getSignedUrl,
}));

import {
  DEFAULT_URL_EXPIRY_SECONDS,
  buildObjectKey,
  createDownloadUrl,
  createR2Client,
  createUploadUrl,
  deleteObject,
  getR2Config,
} from "@/lib/r2";

const validEnv = {
  R2_ACCOUNT_ID: "acc123",
  R2_ACCESS_KEY_ID: "key-id",
  R2_SECRET_ACCESS_KEY: "secret",
  R2_BUCKET: "portfolio-test",
};

describe("getR2Config", () => {
  it("returns the config when every variable is set", () => {
    expect(getR2Config(validEnv)).toEqual({
      accountId: "acc123",
      accessKeyId: "key-id",
      secretAccessKey: "secret",
      bucket: "portfolio-test",
    });
  });

  it("lists every missing variable in the error", () => {
    expect(() => getR2Config({ R2_ACCOUNT_ID: "acc123" })).toThrow(
      "Missing R2 environment variables: R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET"
    );
  });

  it("treats empty strings as missing", () => {
    expect(() => getR2Config({ ...validEnv, R2_BUCKET: "" })).toThrow("R2_BUCKET");
  });

  it("reads process.env by default", () => {
    vi.stubEnv("R2_ACCOUNT_ID", "from-process");
    vi.stubEnv("R2_ACCESS_KEY_ID", "k");
    vi.stubEnv("R2_SECRET_ACCESS_KEY", "s");
    vi.stubEnv("R2_BUCKET", "b");
    expect(getR2Config().accountId).toBe("from-process");
    vi.unstubAllEnvs();
  });
});

describe("createR2Client", () => {
  beforeEach(() => {
    mocks.clientOptions.length = 0;
  });

  it("targets the account endpoint with region auto", () => {
    createR2Client(getR2Config(validEnv));
    expect(mocks.clientOptions[0]).toEqual({
      region: "auto",
      endpoint: "https://acc123.r2.cloudflarestorage.com",
      credentials: { accessKeyId: "key-id", secretAccessKey: "secret" },
    });
  });
});

describe("buildObjectKey", () => {
  it("sanitises the filename and prefixes the timestamp", () => {
    expect(buildObjectKey("uploads", "My Photo (1).PNG", 1700000000000)).toBe(
      "uploads/1700000000000-my-photo-1-.png"
    );
  });

  it("trims slashes from the folder", () => {
    expect(buildObjectKey("/avatars/", "a.png", 1)).toBe("avatars/1-a.png");
  });

  it("falls back to a default name when nothing usable is left", () => {
    expect(buildObjectKey("x", "***", 1)).toBe("x/1-file");
  });

  it("uses the current time by default", () => {
    vi.spyOn(Date, "now").mockReturnValue(42);
    expect(buildObjectKey("x", "a.txt")).toBe("x/42-a.txt");
    vi.restoreAllMocks();
  });
});

describe("presigned URLs and deletion", () => {
  beforeEach(() => {
    vi.stubEnv("R2_ACCOUNT_ID", validEnv.R2_ACCOUNT_ID);
    vi.stubEnv("R2_ACCESS_KEY_ID", validEnv.R2_ACCESS_KEY_ID);
    vi.stubEnv("R2_SECRET_ACCESS_KEY", validEnv.R2_SECRET_ACCESS_KEY);
    vi.stubEnv("R2_BUCKET", validEnv.R2_BUCKET);
    mocks.getSignedUrl.mockReset().mockResolvedValue("https://signed.example/url");
    mocks.send.mockReset().mockResolvedValue({});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("signs an upload URL with the content type and default expiry", async () => {
    await expect(createUploadUrl("a/b.png", "image/png")).resolves.toBe(
      "https://signed.example/url"
    );
    const [, command, options] = mocks.getSignedUrl.mock.calls[0];
    expect(command.input).toEqual({
      Bucket: "portfolio-test",
      Key: "a/b.png",
      ContentType: "image/png",
    });
    expect(options).toEqual({ expiresIn: DEFAULT_URL_EXPIRY_SECONDS });
  });

  it("signs a download URL with a custom expiry", async () => {
    await createDownloadUrl("a/b.png", 60);
    const [, command, options] = mocks.getSignedUrl.mock.calls[0];
    expect(command.input).toEqual({ Bucket: "portfolio-test", Key: "a/b.png" });
    expect(options).toEqual({ expiresIn: 60 });
  });

  it("deletes an object from the configured bucket", async () => {
    await deleteObject("a/b.png");
    expect(mocks.send).toHaveBeenCalledTimes(1);
    expect(mocks.send.mock.calls[0][0].input).toEqual({
      Bucket: "portfolio-test",
      Key: "a/b.png",
    });
  });

  it("fails fast when the environment is not configured", async () => {
    vi.stubEnv("R2_BUCKET", "");
    await expect(createUploadUrl("k", "text/plain")).rejects.toThrow("R2_BUCKET");
  });
});
