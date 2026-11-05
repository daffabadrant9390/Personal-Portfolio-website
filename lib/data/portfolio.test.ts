import { describe, expect, it } from "vitest";
import { experiences, projects, techCategories } from "./portfolio";

const isHttpUrl = (value: string) => {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
};

describe("projects", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("uses unique ids", () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(projects.map((project) => [project.title, project] as const))(
    "%s has the required content",
    (_title, project) => {
      expect(project.title.trim()).not.toBe("");
      expect(project.category.trim()).not.toBe("");
      expect(project.description.trim()).not.toBe("");
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.image.startsWith("/")).toBe(true);
    }
  );

  it("gives every gallery image a source and alt text", () => {
    projects.forEach((project) => {
      project.images?.forEach((image) => {
        expect(image.src.startsWith("/")).toBe(true);
        expect(image.alt.trim()).not.toBe("");
      });
    });
  });

  it("uses valid urls for live and repository links", () => {
    projects.forEach((project) => {
      if (project.liveUrl) expect(isHttpUrl(project.liveUrl)).toBe(true);
      project.githubUrl?.forEach((link) => {
        expect(link.label.trim()).not.toBe("");
        expect(isHttpUrl(link.url)).toBe(true);
      });
    });
  });

  it("has no duplicate tags within a project", () => {
    projects.forEach((project) => {
      expect(new Set(project.tags).size).toBe(project.tags.length);
    });
  });
});

describe("experiences", () => {
  it("has at least one experience", () => {
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("uses unique ids", () => {
    const ids = experiences.map((experience) => experience.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has the required fields on every entry", () => {
    experiences.forEach((experience) => {
      expect(experience.role.trim()).not.toBe("");
      expect(experience.company.trim()).not.toBe("");
      expect(experience.period.trim()).not.toBe("");
      expect(experience.description.trim()).not.toBe("");
    });
  });

  it("marks at most one experience as current", () => {
    expect(experiences.filter((experience) => experience.current).length).toBeLessThanOrEqual(1);
  });
});

describe("techCategories", () => {
  it("has at least one category", () => {
    expect(techCategories.length).toBeGreaterThan(0);
  });

  it("uses unique category labels", () => {
    const labels = techCategories.map((category) => category.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("has named, iconified items in every category", () => {
    techCategories.forEach((category) => {
      expect(category.label.trim()).not.toBe("");
      expect(category.items.length).toBeGreaterThan(0);
      category.items.forEach((item) => {
        expect(item.name.trim()).not.toBe("");
        expect(item.icon.trim()).not.toBe("");
      });
    });
  });

  it("has no duplicate item names inside a category", () => {
    techCategories.forEach((category) => {
      const names = category.items.map((item) => item.name);
      expect(new Set(names).size).toBe(names.length);
    });
  });
});
