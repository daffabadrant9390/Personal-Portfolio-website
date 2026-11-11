import { describe, expect, it } from "vitest";
import { CONTENT_CACHE_TAG, CONTENT_REVALIDATE_SECONDS } from "./cache";

describe("content cache settings", () => {
  it("revalidates in a sensible window and exposes a tag for manual refreshes", () => {
    expect(CONTENT_REVALIDATE_SECONDS).toBeGreaterThan(0);
    expect(CONTENT_CACHE_TAG).toBe("portfolio-content");
  });
});
