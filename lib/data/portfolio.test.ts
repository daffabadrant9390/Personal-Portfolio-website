import { describe, expect, it } from "vitest";
import { currentlyBuilding, education, softSkills, techCategories } from "./portfolio";

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
