import { describe, expect, it } from "vitest";
import { experiences, projects } from "./seed-data";
import { parsePeriod } from "../lib/data/period";

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

  it("uses unique ids (slugs come from the title)", () => {
    const ids = projects.map((project) => project.title);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(projects.map((project) => [project.title, project] as const))(
    "%s has the required content",
    (_title, project) => {
      expect(project.title.trim()).not.toBe("");
      expect(project.category.trim()).not.toBe("");
      expect(project.description.trim()).not.toBe("");
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.image.startsWith("/") || isHttpUrl(project.image)).toBe(true);
    }
  );

  it("gives every gallery image a source and alt text", () => {
    projects.forEach((project) => {
      project.images?.forEach((image) => {
        expect(image.src.startsWith("/") || isHttpUrl(image.src)).toBe(true);
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

  it("separates full time from non full time experience", () => {
    const groups = new Set(experiences.map((experience) => experience.group));
    expect(groups).toEqual(new Set(["full-time", "non-full-time"]));
  });

  it("keeps contract, part time and community work out of the full time group", () => {
    experiences.forEach((experience) => {
      if (["Contract", "Part time", "Community"].includes(experience.employmentType)) {
        expect(experience.group).toBe("non-full-time");
      } else {
        expect(experience.group).toBe("full-time");
      }
    });
  });

  it("gives every entry bullets, either directly or per role", () => {
    experiences.forEach((experience) => {
      const bullets = experience.roles
        ? experience.roles.flatMap((role) => role.highlights)
        : experience.highlights ?? [];
      expect(bullets.length).toBeGreaterThan(0);
      bullets.forEach((bullet) => expect(bullet.trim()).not.toBe(""));
    });
  });

  it("lists both tiket.com roles with their own period", () => {
    const tiket = experiences.find((experience) => experience.id === "tiket");
    expect(tiket?.roles?.map((role) => role.title)).toEqual([
      "Software Engineer II (Frontend)",
      "Software Engineer I (Frontend)",
    ]);
    tiket?.roles?.forEach((role) => expect(role.period.trim()).not.toBe(""));
  });

  it("avoids em dashes and en dashes in visible copy", () => {
    const text = JSON.stringify({ experiences, projects });
    expect(text).not.toMatch(/[\u2013\u2014]/);
  });

  it("has a period that parses into dates the database can store", () => {
    experiences.forEach((experience) => {
      const { startDate, endDate, isCurrent } = parsePeriod(experience.period);
      expect(Number.isNaN(startDate.getTime())).toBe(false);
      if (endDate) expect(endDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
      expect(isCurrent).toBe(Boolean(experience.current));
      experience.roles?.forEach((role) => parsePeriod(role.period));
    });
  });
});

