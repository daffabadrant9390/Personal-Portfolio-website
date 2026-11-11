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
  period: "Jan 2022 to Present",
  group: "full-time",
  employmentType: "Full time",
  location: "Jakarta",
  description: "desc",
  highlights: ["Built things", "Shipped things"],
  tags: ["React", "TypeScript"],
};

describe("ExperienceCard", () => {
  it("shows the header details and employment type while collapsed", () => {
    render(<ExperienceCard experience={experience} />);
    expect(screen.getByRole("heading", { name: "Frontend Engineer" })).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Jan 2022 to Present")).toBeInTheDocument();
    expect(screen.getByText(/Jakarta/)).toBeInTheDocument();
    expect(screen.getByText("Full time")).toBeInTheDocument();

    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
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

  it("lists each role with its own period for multi role companies", async () => {
    const user = userEvent.setup();
    const multi: Experience = {
      ...experience,
      highlights: undefined,
      roles: [
        { title: "Senior Engineer", period: "2025", highlights: ["Led the migration"] },
        { title: "Engineer", period: "2022 to 2024", highlights: ["Built the pages"] },
      ],
    };
    render(<ExperienceCard experience={multi} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("heading", { name: "Senior Engineer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Engineer" })).toBeInTheDocument();
    expect(screen.getByText("2022 to 2024")).toBeInTheDocument();
    expect(screen.getByText("Led the migration")).toBeInTheDocument();
    expect(screen.getByText("Built the pages")).toBeInTheDocument();
  });

  it("labels non full time work", () => {
    render(
      <ExperienceCard experience={{ ...experience, group: "non-full-time", employmentType: "Contract" }} />
    );
    expect(screen.getByText("Contract")).toBeInTheDocument();
  });

  it("omits optional sections when data is missing", () => {
    const minimal: Experience = {
      id: "e2",
      role: "Dev",
      company: "Co",
      period: "2020",
      group: "full-time",
      employmentType: "Internship",
      description: "d",
    };
    render(<ExperienceCard experience={minimal} defaultExpanded />);
    expect(screen.getByRole("heading", { name: "Dev" })).toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });
});
