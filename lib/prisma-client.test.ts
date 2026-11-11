import { beforeEach, describe, expect, it, vi } from "vitest";

const adapterCtor = vi.fn();
const clientCtor = vi.fn();

vi.mock("@prisma/adapter-mariadb", () => ({
  PrismaMariaDb: class {
    constructor(config: unknown) {
      adapterCtor(config);
    }
  },
}));
vi.mock("../generated/prisma/client", () => ({
  PrismaClient: class {
    constructor(options: unknown) {
      clientCtor(options);
    }
  },
}));

import { createPrismaClient } from "./prisma-client";

describe("createPrismaClient", () => {
  beforeEach(() => {
    adapterCtor.mockClear();
    clientCtor.mockClear();
  });

  it("throws a clear error when DATABASE_URL is missing", () => {
    expect(() => createPrismaClient("")).toThrow("DATABASE_URL is not set");
  });

  it("builds the pool config from the URL and decodes percent encoded credentials", () => {
    createPrismaClient("mysql://app%40user:p%21ss%23word@db.example.com:3307/portfolio_staging");
    expect(adapterCtor).toHaveBeenCalledWith({
      host: "db.example.com",
      port: 3307,
      user: "app@user",
      password: "p!ss#word",
      database: "portfolio_staging",
      connectionLimit: 5,
    });
    expect(clientCtor).toHaveBeenCalledWith({ adapter: expect.anything() });
  });

  it("defaults to port 3306", () => {
    createPrismaClient("mysql://u:p@localhost/portfolio");
    expect(adapterCtor.mock.calls[0][0]).toMatchObject({ port: 3306, database: "portfolio" });
  });
});
