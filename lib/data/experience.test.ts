import { beforeEach, describe, expect, it, vi } from "vitest";

const findMany = vi.fn();

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({ unstable_cache: <T extends (...a: never[]) => unknown>(fn: T) => fn }));
vi.mock("@/lib/db", () => ({ getDb: () => ({ experience: { findMany } }) }));

import { getExperiences } from "./experience";

const d = (y: number, m: number) => new Date(Date.UTC(y, m - 1, 1));

const base = {
  slug: "kredivo",
  role: "Engineer",
  company: "Kredivo",
  startDate: d(2026, 1),
  endDate: null,
  isCurrent: true,
  group: "FULL_TIME",
  employmentType: "FULL_TIME",
  location: "Jakarta",
  description: "desc",
  url: null,
  roles: [],
  highlights: [{ text: "Did a thing" }],
  tags: [{ tag: { name: "Go" } }],
};

describe("getExperiences", () => {
  beforeEach(() => findMany.mockReset());

  it("sorts by start date, newest first", async () => {
    findMany.mockResolvedValue([]);
    await getExperiences();
    expect(findMany.mock.calls[0][0].orderBy).toEqual([{ startDate: "desc" }, { sortOrder: "asc" }]);
  });

  it("maps a single role entry and shows Present while it is current", async () => {
    findMany.mockResolvedValue([base]);
    const [exp] = await getExperiences();

    expect(exp).toMatchObject({
      id: "kredivo",
      role: "Engineer",
      company: "Kredivo",
      period: "Jan 2026 to Present",
      group: "full-time",
      employmentType: "Full time",
      location: "Jakarta",
      current: true,
      highlights: ["Did a thing"],
      tags: ["Go"],
    });
    expect(exp).not.toHaveProperty("roles");
    expect(exp).not.toHaveProperty("url");
  });

  it("maps every group and employment type", async () => {
    findMany.mockResolvedValue([
      { ...base, group: "NON_FULL_TIME", employmentType: "INTERNSHIP" },
      { ...base, group: "NON_FULL_TIME", employmentType: "CONTRACT" },
      { ...base, group: "NON_FULL_TIME", employmentType: "PART_TIME" },
      { ...base, group: "NON_FULL_TIME", employmentType: "COMMUNITY" },
    ]);
    const list = await getExperiences();
    expect(list.map((e) => e.employmentType)).toEqual(["Internship", "Contract", "Part time", "Community"]);
    expect(list.every((e) => e.group === "non-full-time")).toBe(true);
  });

  it("uses per role periods and bullets when a company has several roles", async () => {
    findMany.mockResolvedValue([
      {
        ...base,
        slug: "tiket",
        startDate: d(2022, 3),
        endDate: d(2025, 12),
        isCurrent: false,
        url: "https://www.tiket.com",
        location: null,
        roles: [
          { title: "SE II", startDate: d(2025, 1), endDate: d(2025, 12), isCurrent: false, highlights: [{ text: "a" }, { text: "b" }] },
          { title: "SE I", startDate: d(2022, 3), endDate: d(2024, 12), isCurrent: false, highlights: [{ text: "c" }] },
        ],
      },
    ]);
    const [exp] = await getExperiences();

    expect(exp.period).toBe("Mar 2022 to Dec 2025");
    expect(exp.current).toBe(false);
    expect(exp.url).toBe("https://www.tiket.com");
    expect(exp).not.toHaveProperty("location");
    expect(exp).not.toHaveProperty("highlights");
    expect(exp.roles).toEqual([
      { title: "SE II", period: "Jan 2025 to Dec 2025", highlights: ["a", "b"] },
      { title: "SE I", period: "Mar 2022 to Dec 2024", highlights: ["c"] },
    ]);
  });

  it("is not current when an end date exists even if is_current is still true", async () => {
    findMany.mockResolvedValue([{ ...base, endDate: d(2026, 6) }]);
    const [exp] = await getExperiences();
    expect(exp.current).toBe(false);
    expect(exp.period).toBe("Jan 2026 to Jun 2026");
  });
});
