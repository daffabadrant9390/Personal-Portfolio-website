import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExperienceCard } from "@/components/sections/about/ExperienceCard";
import type { Experience } from "@/lib/types";

vi.mock("framer-motion", () => import("@/test-utils/framer-motion-mock"));

const experience: Experience = {
  id: "e1",
  role: "Frontend Engineer",
  company: "Acme",
  period: "2022 - Present",
  location: "Jakarta",
  description: "desc",
  highlights: ["Built things", "Shipped things"],
  tags: ["React", "TypeScript"],
};

describe("ExperienceCard", () => {
  it("shows the header details while collapsed", () => {
    render(<ExperienceCard experience={experience} />);
    expect(screen.getByRole("heading", { name: "Frontend Engineer" })).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("2022 - Present")).toBeInTheDocument();
    expect(screen.getByText(/Jakarta/)).toBeInTheDocument();

    const toggle = screen.getByRole("button");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Built things")).not.toBeInTheDocument();
  });

  it("expands and collapses on click", async () => {
    const user = userEvent.setup();
    render(<ExperienceCard experience={experience} />);
    const toggle = screen.getByRole("button");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Built things")).toBeInTheDocument();
    expect(screen.getByText("Shipped things")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Built things")).not.toBeInTheDocument();
  });

  it("starts expanded when defaultExpanded is set", () => {
    render(<ExperienceCard experience={experience} defaultExpanded />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Built things")).toBeInTheDocument();
  });

  it("omits optional sections when data is missing", () => {
    const minimal: Experience = {
      id: "e2",
      role: "Dev",
      company: "Co",
      period: "2020",
      description: "d",
    };
    render(<ExperienceCard experience={minimal} defaultExpanded />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.queryByText(/,\s/)).not.toBeInTheDocument();
  });
});
