import { beforeEach, describe, expect, it, vi } from "vitest";

const findMany = vi.fn();

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({ unstable_cache: <T extends (...a: never[]) => unknown>(fn: T) => fn }));
vi.mock("@/lib/db", () => ({ getDb: () => ({ project: { findMany } }) }));

import { getProjects } from "./projects";

const row = {
  slug: "tiket",
  title: "tiket.com",
  category: "Frontend",
  description: "desc",
  liveUrl: "https://www.tiket.com",
  images: [
    { r2Key: "portfolio-projects/tiket-com/tiket-1.jpg", alt: "one", caption: "First" },
    { r2Key: "/portfolio-projects/tiket-com/tiket-2.jpg", alt: "two", caption: null },
  ],
  links: [{ label: "FE", url: "https://github.com/x/fe" }],
  tags: [{ tag: { name: "Next.js" } }, { tag: { name: "TypeScript" } }],
};

describe("getProjects", () => {
  beforeEach(() => findMany.mockReset());

  it("asks the database for ordered rows with their children", async () => {
    findMany.mockResolvedValue([]);
    await getProjects();
    const args = findMany.mock.calls[0][0];
    expect(args.orderBy).toEqual([{ sortOrder: "asc" }, { id: "asc" }]);
    expect(args.include.images.orderBy).toEqual({ sortOrder: "asc" });
    expect(args.include.tags.include).toEqual({ tag: true });
  });

  it("maps a row into the Project shape the components use", async () => {
    findMany.mockResolvedValue([row]);
    const [project] = await getProjects();

    expect(project).toMatchObject({
      id: "tiket",
      title: "tiket.com",
      category: "Frontend",
      description: "desc",
      tags: ["Next.js", "TypeScript"],
      liveUrl: "https://www.tiket.com",
      githubUrl: [{ label: "FE", url: "https://github.com/x/fe" }],
    });
    // The first image is the cover, keys resolve to rooted paths with no double slash.
    expect(project.image).toBe("/portfolio-projects/tiket-com/tiket-1.jpg");
    expect(project.images?.map((i) => i.src)).toEqual([
      "/portfolio-projects/tiket-com/tiket-1.jpg",
      "/portfolio-projects/tiket-com/tiket-2.jpg",
    ]);
    expect(project.images?.[0].caption).toBe("First");
    expect(project.images?.[1]).not.toHaveProperty("caption");
  });

  it("omits liveUrl when empty and tolerates a project without images", async () => {
    findMany.mockResolvedValue([{ ...row, liveUrl: null, images: [], links: [] }]);
    const [project] = await getProjects();
    expect(project).not.toHaveProperty("liveUrl");
    expect(project.image).toBe("");
    expect(project.githubUrl).toEqual([]);
  });
});
