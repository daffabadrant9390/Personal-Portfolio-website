import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TechBadge } from "@/components/sections/projects/TechBadge";
import { ProjectFilters } from "@/components/sections/projects/ProjectFilters";
import { ProjectsExplorer } from "@/components/sections/projects/ProjectsExplorer";
import type { Project } from "@/lib/types";

vi.mock("framer-motion", () => import("@/test-utils/framer-motion-mock"));

vi.mock("@/components/sections/projects/ProjectCard", () => ({
  ProjectCard: ({
    project,
    onViewDetails,
  }: {
    project: Project;
    onViewDetails: (p: Project) => void;
  }) => (
    <button data-testid="card" onClick={() => onViewDetails(project)}>
      {project.title}
    </button>
  ),
}));

vi.mock("@/components/sections/projects/ProjectDetailsSheet", () => ({
  ProjectDetailsSheet: ({
    project,
    onClose,
  }: {
    project: Project | null;
    onClose: () => void;
  }) =>
    project ? (
      <div role="dialog">
        <span>details:{project.title}</span>
        <button onClick={onClose}>close-details</button>
      </div>
    ) : null,
}));

// Native <select> stand-in so the sort control can be exercised without the
// base-ui popup/portal machinery.
vi.mock("@/components/ui/select", () => ({
  SelectRoot: ({
    value,
    onValueChange,
    children,
  }: {
    value: string;
    onValueChange: (v: string | null) => void;
    children: React.ReactNode;
  }) => (
    <div>
      <select
        aria-label="sort-native"
        value={value}
        onChange={(e) => onValueChange(e.target.value || null)}
      >
        <option value="none">none</option>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
        <option value="">empty</option>
      </select>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
  SelectPopup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectList: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const projects: Project[] = [
  { id: "1", title: "Banana App", category: "Frontend", description: "d", image: "/a.png", tags: [] },
  { id: "2", title: "Apple API", category: "Backend", description: "d", image: "/b.png", tags: [] },
  { id: "3", title: "Cherry UI", category: "Frontend", description: "d", image: "/c.png", tags: [] },
];

const cardTitles = () => screen.getAllByTestId("card").map((el) => el.textContent);

describe("TechBadge", () => {
  it("renders the tag with an icon for a known technology", () => {
    const { container } = render(<TechBadge tag="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(container.querySelector("img")).toHaveAttribute("src");
  });

  it("drops the icon when it fails to load", () => {
    const { container } = render(<TechBadge tag="React" />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    fireEvent.error(img as HTMLImageElement);
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});

describe("ProjectFilters", () => {
  const baseProps = {
    search: "",
    onSearchChange: vi.fn(),
    categories: ["Frontend", "Backend"],
    activeCategory: null as string | null,
    onCategoryChange: vi.fn(),
    sortOrder: "none" as const,
    onSortChange: vi.fn(),
  };

  it("reports search input changes", () => {
    const onSearchChange = vi.fn();
    render(<ProjectFilters {...baseProps} onSearchChange={onSearchChange} />);
    fireEvent.change(screen.getByPlaceholderText("Search projects by title..."), {
      target: { value: "abc" },
    });
    expect(onSearchChange).toHaveBeenCalledWith("abc");
  });

  it("renders All plus one chip per category and reports selection", async () => {
    const onCategoryChange = vi.fn();
    const user = userEvent.setup();
    render(<ProjectFilters {...baseProps} onCategoryChange={onCategoryChange} />);

    await user.click(screen.getByRole("button", { name: "Backend" }));
    expect(onCategoryChange).toHaveBeenCalledWith("Backend");

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(onCategoryChange).toHaveBeenCalledWith(null);
  });

  it("highlights the active category chip", () => {
    render(<ProjectFilters {...baseProps} activeCategory="Frontend" />);
    expect(screen.getByRole("button", { name: "Frontend" }).className).toContain("bg-blue-600");
    expect(screen.getByRole("button", { name: "All" }).className).not.toContain("bg-blue-600");
  });

  it("highlights All when no category is active", () => {
    render(<ProjectFilters {...baseProps} />);
    expect(screen.getByRole("button", { name: "All" }).className).toContain("bg-blue-600");
  });

  it("forwards sort changes and ignores empty values", () => {
    const onSortChange = vi.fn();
    render(<ProjectFilters {...baseProps} onSortChange={onSortChange} />);
    const select = screen.getByLabelText("sort-native");

    fireEvent.change(select, { target: { value: "asc" } });
    expect(onSortChange).toHaveBeenCalledWith("asc");

    onSortChange.mockClear();
    fireEvent.change(select, { target: { value: "" } });
    expect(onSortChange).not.toHaveBeenCalled();
  });
});

describe("ProjectsExplorer", () => {
  it("shows every project initially", () => {
    render(<ProjectsExplorer projects={projects} />);
    expect(cardTitles()).toEqual(["Banana App", "Apple API", "Cherry UI"]);
  });

  it("derives unique categories for the filter chips", () => {
    render(<ProjectsExplorer projects={projects} />);
    expect(screen.getAllByRole("button", { name: "Frontend" })).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Backend" })).toBeInTheDocument();
  });

  it("filters by search text case-insensitively", () => {
    render(<ProjectsExplorer projects={projects} />);
    fireEvent.change(screen.getByPlaceholderText("Search projects by title..."), {
      target: { value: "  CHERRY " },
    });
    expect(cardTitles()).toEqual(["Cherry UI"]);
  });

  it("filters by category and resets with All", async () => {
    const user = userEvent.setup();
    render(<ProjectsExplorer projects={projects} />);

    await user.click(screen.getByRole("button", { name: "Backend" }));
    expect(cardTitles()).toEqual(["Apple API"]);

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(cardTitles()).toHaveLength(3);
  });

  it("sorts ascending and descending by title", () => {
    render(<ProjectsExplorer projects={projects} />);
    const select = screen.getByLabelText("sort-native");

    fireEvent.change(select, { target: { value: "asc" } });
    expect(cardTitles()).toEqual(["Apple API", "Banana App", "Cherry UI"]);

    fireEvent.change(select, { target: { value: "desc" } });
    expect(cardTitles()).toEqual(["Cherry UI", "Banana App", "Apple API"]);

    fireEvent.change(select, { target: { value: "none" } });
    expect(cardTitles()).toEqual(["Banana App", "Apple API", "Cherry UI"]);
  });

  it("shows an empty state when nothing matches", () => {
    render(<ProjectsExplorer projects={projects} />);
    fireEvent.change(screen.getByPlaceholderText("Search projects by title..."), {
      target: { value: "zzz" },
    });
    expect(screen.getByText("No projects found")).toBeInTheDocument();
    expect(screen.queryAllByTestId("card")).toHaveLength(0);
  });

  it("opens and closes the details sheet", async () => {
    const user = userEvent.setup();
    render(<ProjectsExplorer projects={projects} />);

    await user.click(screen.getByText("Apple API", { selector: "[data-testid='card']" }));
    expect(screen.getByText("details:Apple API")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "close-details" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
