import { describe, expect, it } from "vitest";
import { getDeviconUrl, getIconTone } from "./devicons";

describe("getDeviconUrl", () => {
  it("returns a devicon CDN url for a known tag", () => {
    expect(getDeviconUrl("react")).toBe(
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
    );
  });

  it("normalizes case, spacing and punctuation", () => {
    const expected = getDeviconUrl("nodejs");
    expect(expected).toContain("/nodejs/nodejs-original.svg");
    expect(getDeviconUrl("Node.js")).toBe(expected);
    expect(getDeviconUrl("node js")).toBe(expected);
    expect(getDeviconUrl("NODEJS")).toBe(expected);
  });

  it("resolves aliases to the same icon", () => {
    expect(getDeviconUrl("Go")).toBe(getDeviconUrl("Golang"));
    expect(getDeviconUrl("k8s")).toBe(getDeviconUrl("Kubernetes"));
    expect(getDeviconUrl("AWS")).toBe(getDeviconUrl("Amazon Web Services"));
    expect(getDeviconUrl("Express")).toBe(getDeviconUrl("Express.js"));
  });

  it("uses the simple-icons CDN for tools devicon does not cover", () => {
    expect(getDeviconUrl("Stripe")).toBe(
      "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/stripe.svg"
    );
    expect(getDeviconUrl("Claude Code")).toContain("simple-icons");
  });

  it("returns undefined for unknown tags and empty input", () => {
    expect(getDeviconUrl("definitely-not-a-real-tool")).toBeUndefined();
    expect(getDeviconUrl("")).toBeUndefined();
    expect(getDeviconUrl("   ")).toBeUndefined();
  });
});

describe("getIconTone", () => {
  it("returns 'dark' for solid dark marks that need inverting in dark mode", () => {
    expect(getIconTone("Next.js")).toBe("dark");
    expect(getIconTone("GitHub")).toBe("dark");
    expect(getIconTone("Stripe")).toBe("dark");
  });

  it("returns undefined for full-color icons", () => {
    expect(getIconTone("React")).toBeUndefined();
    expect(getIconTone("TypeScript")).toBeUndefined();
  });

  it("returns undefined for unknown tags", () => {
    expect(getIconTone("unknown-tool")).toBeUndefined();
  });
});
