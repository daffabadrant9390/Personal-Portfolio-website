import { afterEach, describe, expect, it, vi } from "vitest";

const createPrismaClient = vi.fn(() => ({ id: Math.random() }));

vi.mock("server-only", () => ({}));
vi.mock("@/lib/prisma-client", () => ({ createPrismaClient }));

describe("getDb", () => {
  afterEach(() => {
    delete (globalThis as { prisma?: unknown }).prisma;
    createPrismaClient.mockClear();
    vi.resetModules();
  });

  it("creates the client once and reuses it", async () => {
    const { getDb } = await import("./db");
    expect(getDb()).toBe(getDb());
    expect(createPrismaClient).toHaveBeenCalledTimes(1);
  });

  it("reuses the client across module reloads, like hot reload in dev", async () => {
    const first = (await import("./db")).getDb();
    vi.resetModules();
    const second = (await import("./db")).getDb();
    expect(second).toBe(first);
    expect(createPrismaClient).toHaveBeenCalledTimes(1);
  });
});
