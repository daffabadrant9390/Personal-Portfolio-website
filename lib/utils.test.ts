import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, null, undefined, 0 && "x", "b")).toBe("a b");
  });

  it("supports conditional objects and arrays", () => {
    expect(cn({ active: true, hidden: false }, ["x", "y"])).toBe("active x y");
  });

  it("lets later Tailwind classes override earlier conflicting ones", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm text-red-500", "text-blue-500")).toBe("text-sm text-blue-500");
  });

  it("keeps non-conflicting Tailwind classes", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("returns an empty string when given nothing", () => {
    expect(cn()).toBe("");
  });
});
