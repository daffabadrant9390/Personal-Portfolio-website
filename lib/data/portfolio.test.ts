import { describe, expect, it } from "vitest";
import { currentlyBuilding, education, experiences, projects, softSkills, techCategories } from "./portfolio";

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
    const text = JSON.stringify({ experiences, projects, techCategories, softSkills, education });
    expect(text).not.toMatch(/[\u2013\u2014]/);
  });
});

describe("soft skills and education", () => {
  it("backs every soft skill with evidence", () => {
    expect(softSkills.length).toBeGreaterThan(0);
    softSkills.forEach((skill) => {
      expect(skill.title.trim()).not.toBe("");
      expect(skill.evidence.trim()).not.toBe("");
    });
  });

  it("has education and currently building topics", () => {
    expect(education.length).toBeGreaterThan(0);
    expect(currentlyBuilding.length).toBeGreaterThan(0);
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

  it("resolves a logo for every skill with an icon key", async () => {
    const { getDeviconUrl } = await import("./../devicons");
    techCategories.forEach((category) => {
      category.items.forEach((item) => {
        expect(getDeviconUrl(item.icon), `${item.name} (${item.icon})`).toBeDefined();
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
