import { describe, expect, it } from "vitest";
import { assetUrl, getAssetsBaseUrl } from "./assets";

describe("getAssetsBaseUrl", () => {
  it("returns an empty string when the variable is missing", () => {
    expect(getAssetsBaseUrl({})).toBe("");
  });

  it("trims spaces and trailing slashes", () => {
    expect(getAssetsBaseUrl({ NEXT_PUBLIC_ASSETS_BASE_URL: " https://assets.example.com// " })).toBe(
      "https://assets.example.com"
    );
  });
});

describe("assetUrl", () => {
  it("keeps the local /public path when no base url is set", () => {
    expect(assetUrl("/assets/tiket/tiket-1.jpg", "")).toBe("/assets/tiket/tiket-1.jpg");
  });

  it("prefixes the bucket url for the active environment", () => {
    expect(assetUrl("/assets/tiket/tiket-1.jpg", "https://staging-assets.example.com")).toBe(
      "https://staging-assets.example.com/assets/tiket/tiket-1.jpg"
    );
    expect(assetUrl("assets/tiket/tiket-1.jpg", "https://assets.example.com")).toBe(
      "https://assets.example.com/assets/tiket/tiket-1.jpg"
    );
  });
});
