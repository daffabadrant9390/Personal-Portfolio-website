import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutSkeleton } from "@/components/skeletons/AboutSkeleton";
import { HomeSkeleton } from "@/components/skeletons/HomeSkeleton";
import { ProjectsSkeleton } from "@/components/skeletons/ProjectsSkeleton";
import { techCategories } from "@/lib/data/portfolio";

describe("loading skeletons", () => {
  it.each([
    ["home", <HomeSkeleton key="h" />, "Loading home page"],
    ["about", <AboutSkeleton key="a" />, "Loading about page"],
    ["projects", <ProjectsSkeleton key="p" />, "Loading projects"],
  ])("%s skeleton is one labelled busy region with no real copy", (_name, ui, label) => {
    const { container } = render(ui);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-busy", "true");
    // Only the screen reader label is text: no headings or paragraphs that could mislead.
    expect(container.textContent).toBe(label);
    expect(container.querySelectorAll("h1, h2, h3, p, a, button").length).toBe(0);
  });

  it("home skeleton follows the home page sections", () => {
    const { container } = render(<HomeSkeleton />);
    // Hero, about preview, tech stack, featured projects, contact call to action.
    expect(container.querySelectorAll("section")).toHaveLength(5);
    // The skill cards use the same static data as the real tech stack.
    expect(container.querySelectorAll(".card-solid")).toHaveLength(techCategories.length);
  });

  it("about skeleton follows the about page sections", () => {
    const { container } = render(<AboutSkeleton />);
    // Hero, gallery, experience, skills, education, contact call to action.
    expect(container.querySelectorAll("section")).toHaveLength(6);
    expect(container.querySelectorAll(".card-solid")).toHaveLength(techCategories.length);
  });

  it("projects skeleton renders the requested number of cards", () => {
    const { container } = render(<ProjectsSkeleton cards={4} />);
    expect(container.querySelectorAll(".rounded-2xl.border-2")).toHaveLength(4);
  });

  it("about skeleton hides the gallery from large screens like the real page", () => {
    const { container } = render(<AboutSkeleton />);
    expect(container.querySelector("section.lg\\:hidden")).not.toBeNull();
  });
});
