import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectShowcase } from "@/components/sections/projects/ProjectShowcase";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import type { Project, ProjectImage } from "@/lib/types";

vi.mock("framer-motion", () => import("@/test-utils/framer-motion-mock"));

const images: ProjectImage[] = [
  { src: "/a.jpg", alt: "First screen", caption: "Home page" },
  { src: "/b.jpg", alt: "Second screen", caption: "Search page" },
  { src: "/c.jpg", alt: "Third screen" },
];

const caption = () => screen.getByText(/page$|Third screen/, { selector: "p" });

describe("ProjectShowcase", () => {
  it("starts on the first screenshot with its caption and a counter", () => {
    render(<ProjectShowcase images={images} title="tiket.com" />);
    expect(screen.getByRole("group", { name: "tiket.com screenshots" })).toBeInTheDocument();
    expect(screen.getByAltText("First screen")).toBeInTheDocument();
    expect(screen.getByText("Home page")).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("moves with the arrows and wraps around at both ends", async () => {
    const user = userEvent.setup();
    render(<ProjectShowcase images={images} title="t" />);

    await user.click(screen.getByRole("button", { name: "Next screenshot" }));
    expect(screen.getByText("Search page")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous screenshot" }));
    await user.click(screen.getByRole("button", { name: "Previous screenshot" }));
    expect(screen.getByAltText("Third screen")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next screenshot" }));
    expect(screen.getByAltText("First screen")).toBeInTheDocument();
  });

  it("falls back to the alt text when a screenshot has no caption", async () => {
    const user = userEvent.setup();
    render(<ProjectShowcase images={images} title="t" />);
    await user.click(screen.getByRole("button", { name: "Show screenshot 3 of 3" }));
    expect(caption()).toHaveTextContent("Third screen");
  });

  it("jumps to a screenshot from the thumbnails and marks the current one", async () => {
    const user = userEvent.setup();
    render(<ProjectShowcase images={images} title="t" />);

    await user.click(screen.getByRole("button", { name: "Show screenshot 2 of 3" }));
    expect(screen.getByAltText("Second screen")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show screenshot 2 of 3" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("button", { name: "Show screenshot 1 of 3" })).not.toHaveAttribute("aria-current");
  });

  it("responds to the left and right arrow keys", () => {
    render(<ProjectShowcase images={images} title="t" />);
    const viewer = screen.getByRole("group", { name: "t screenshots" });

    fireEvent.keyDown(viewer, { key: "ArrowRight" });
    expect(screen.getByAltText("Second screen")).toBeInTheDocument();
    fireEvent.keyDown(viewer, { key: "ArrowLeft" });
    expect(screen.getByAltText("First screen")).toBeInTheDocument();
    fireEvent.keyDown(viewer, { key: "Enter" });
    expect(screen.getByAltText("First screen")).toBeInTheDocument();
  });

  it("swipes between screenshots on touch screens and ignores tiny drags", () => {
    render(<ProjectShowcase images={images} title="t" />);
    const viewer = screen.getByRole("group", { name: "t screenshots" });

    fireEvent.touchStart(viewer, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(viewer, { changedTouches: [{ clientX: 100 }] });
    expect(screen.getByAltText("Second screen")).toBeInTheDocument();

    fireEvent.touchStart(viewer, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(viewer, { changedTouches: [{ clientX: 200 }] });
    expect(screen.getByAltText("First screen")).toBeInTheDocument();

    fireEvent.touchStart(viewer, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(viewer, { changedTouches: [{ clientX: 110 }] });
    expect(screen.getByAltText("First screen")).toBeInTheDocument();
  });

  it("hides the controls when there is only one screenshot", () => {
    render(<ProjectShowcase images={[images[0]]} title="t" />);
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByText("1 / 1")).toBeNull();
    expect(screen.getByAltText("First screen")).toBeInTheDocument();
  });

  it("renders nothing without images", () => {
    const { container } = render(<ProjectShowcase images={[]} title="t" />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("ProjectCard", () => {
  const project: Project = {
    id: "tiket-com",
    title: "tiket.com",
    category: "Frontend",
    description: "desc",
    image: "/a.jpg",
    images,
    tags: ["Next.js", "TypeScript", "React.js", "Node.js", "GraphQL", "Figma"],
    liveUrl: "https://www.tiket.com",
    githubUrl: [{ label: "FE", url: "https://github.com/x/fe" }],
  };

  it("links the title to the project's own page", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("link", { name: "tiket.com" })).toHaveAttribute("href", "/projects/tiket-com");
  });

  it("keeps the external links separate from the project link", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("link", { name: /live demo/i })).toHaveAttribute("href", "https://www.tiket.com");
    expect(screen.getByRole("link", { name: /FE GitHub repository/i })).toHaveAttribute("href", "https://github.com/x/fe");
  });

  it("falls back to the cover image when there is no gallery and handles no links", () => {
    render(<ProjectCard project={{ ...project, images: undefined, liveUrl: undefined, githubUrl: undefined, tags: ["Go"] }} />);
    expect(screen.getByAltText("tiket.com")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /live demo/i })).toBeNull();
    expect(screen.queryByText(/^\+/)).toBeNull();
  });

  it("counts the tags that do not fit", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getAllByText(/^\+\d$/).length).toBeGreaterThan(0);
  });
});
