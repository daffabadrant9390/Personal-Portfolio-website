import { beforeEach, describe, expect, it, vi } from "vitest";

const projectAggregate = vi.fn();
const experienceAggregate = vi.fn();
const projectFindMany = vi.fn();

vi.mock("server-only", () => ({}));
vi.mock("@/lib/db", () => ({
  getDb: () => ({
    project: { aggregate: projectAggregate, findMany: projectFindMany },
    experience: { aggregate: experienceAggregate },
  }),
}));

import { getContentDates, getProjectDates } from "./lastModified";

describe("getContentDates", () => {
  beforeEach(() => {
    projectAggregate.mockReset();
    experienceAggregate.mockReset();
  });

  it("returns the latest change of projects and experience", async () => {
    const p = new Date("2026-11-01"), e = new Date("2026-10-01");
    projectAggregate.mockResolvedValue({ _max: { updatedAt: p } });
    experienceAggregate.mockResolvedValue({ _max: { updatedAt: e } });
    expect(await getContentDates()).toEqual({ projects: p, experience: e });
  });

  it("leaves a date out when the table is empty", async () => {
    projectAggregate.mockResolvedValue({ _max: { updatedAt: null } });
    experienceAggregate.mockResolvedValue({ _max: { updatedAt: null } });
    expect(await getContentDates()).toEqual({ projects: undefined, experience: undefined });
  });

  it("returns nothing instead of failing when the database is unreachable", async () => {
    projectAggregate.mockRejectedValue(new Error("connect ECONNREFUSED"));
    experienceAggregate.mockResolvedValue({ _max: { updatedAt: null } });
    expect(await getContentDates()).toEqual({});
  });
});

describe("getProjectDates", () => {
  beforeEach(() => {
    projectFindMany.mockReset();
  });

  it("returns the slug and last change of every project", async () => {
    const rows = [{ slug: "tiket", updatedAt: new Date("2026-11-01") }];
    projectFindMany.mockResolvedValue(rows);
    expect(await getProjectDates()).toEqual(rows);
    expect(projectFindMany.mock.calls[0][0].select).toEqual({ slug: true, updatedAt: true });
  });

  it("returns an empty list when the database is unreachable", async () => {
    projectFindMany.mockRejectedValue(new Error("down"));
    expect(await getProjectDates()).toEqual([]);
  });
});
