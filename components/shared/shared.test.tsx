import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ErrorFeedback } from "@/components/shared/ErrorFeedback";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

vi.mock("framer-motion", () => import("@/test-utils/framer-motion-mock"));

vi.mock("@/components/shared/ResponsiveOverlay", () => ({
  ResponsiveOverlay: ({
    open,
    ariaLabel,
    children,
  }: {
    open: boolean;
    ariaLabel: string;
    children: React.ReactNode;
  }) => (open ? <div role="dialog" aria-label={ariaLabel}>{children}</div> : null),
}));

describe("Container", () => {
  it("renders children and merges className", () => {
    render(
      <Container className="extra">
        <p>inside</p>
      </Container>
    );
    const wrapper = screen.getByText("inside").parentElement;
    expect(wrapper).toHaveClass("mx-auto", "max-w-7xl", "extra");
  });
});

describe("AnimatedSection", () => {
  it("renders children inside a wrapper with the className", () => {
    render(
      <AnimatedSection className="section" delay={0.2} direction="left">
        <span>content</span>
      </AnimatedSection>
    );
    expect(screen.getByText("content").parentElement).toHaveClass("section");
  });

  it.each(["up", "down", "left", "right", "none"] as const)(
    "supports direction %s",
    (direction) => {
      render(
        <AnimatedSection direction={direction}>
          <span>{direction}</span>
        </AnimatedSection>
      );
      expect(screen.getByText(direction)).toBeInTheDocument();
    }
  );
});

describe("ErrorFeedback", () => {
  it("renders nothing when there are no errors", () => {
    const { container } = render(<ErrorFeedback open errors={[]} onClose={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("lists every error with the default title", () => {
    render(<ErrorFeedback open errors={["Name is required", "Email is invalid"]} onClose={vi.fn()} />);
    expect(screen.getByRole("dialog", { name: "Please fix the highlighted fields" })).toBeInTheDocument();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
  });

  it("uses a custom title", () => {
    render(<ErrorFeedback open title="Oops" errors={["x"]} onClose={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "Oops" })).toBeInTheDocument();
  });

  it("calls onClose from both the close icon and the confirm button", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ErrorFeedback open errors={["x"]} onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Close" }));
    await user.click(screen.getByRole("button", { name: "Got it" }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("renders nothing visible when closed", () => {
    render(<ErrorFeedback open={false} errors={["x"]} onClose={vi.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("ThemeProvider", () => {
  it("renders its children", () => {
    render(
      <ThemeProvider>
        <p>themed</p>
      </ThemeProvider>
    );
    expect(screen.getByText("themed")).toBeInTheDocument();
  });
});

describe("ShimmerImage", () => {
  it("shows a shimmer until the image loads, then removes it", async () => {
    const { ShimmerImage } = await import("./ShimmerImage");
    render(
      <div style={{ position: "relative" }}>
        <ShimmerImage src="/photo.jpg" alt="A photo" fill sizes="100px" />
      </div>
    );
    expect(screen.getByTestId("image-shimmer")).toBeInTheDocument();
    fireEvent.load(screen.getByAltText("A photo"));
    // next/image reports the load asynchronously (after the image decodes).
    await waitFor(() =>
      expect(screen.queryByTestId("image-shimmer")).not.toBeInTheDocument()
    );
  });

  it("retries a failed remote image straight from its own URL before giving up", async () => {
    const { ShimmerImage } = await import("./ShimmerImage");
    render(
      <div style={{ position: "relative" }}>
        <ShimmerImage src="https://assets.example.com/a.jpg" alt="Remote photo" fill sizes="100px" />
      </div>
    );
    const img = screen.getByAltText("Remote photo");
    expect(img.getAttribute("src")).toContain("/_next/image");
    fireEvent.error(img);
    const retried = screen.getByAltText("Remote photo");
    expect(retried.getAttribute("src")).toBe("https://assets.example.com/a.jpg");
    expect(screen.getByTestId("image-shimmer")).toBeInTheDocument();
    fireEvent.error(retried);
    expect(screen.getByRole("img", { name: "Remote photo" }).tagName).toBe("DIV");
  });

  it("shows a placeholder instead of a broken image when loading fails", async () => {
    const { ShimmerImage } = await import("./ShimmerImage");
    render(
      <div style={{ position: "relative" }}>
        <ShimmerImage src="/missing.jpg" alt="Missing photo" fill sizes="100px" />
      </div>
    );
    fireEvent.error(screen.getByAltText("Missing photo"));
    expect(screen.queryByTestId("image-shimmer")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Missing photo" })).toBeInTheDocument();
  });
});

describe("Skeleton", () => {
  it("renders a hidden shimmering block with the given classes", async () => {
    const { Skeleton } = await import("@/components/ui/skeleton");
    const { container } = render(<Skeleton className="h-4 w-40" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el.className).toContain("shimmer");
    expect(el.className).toContain("h-4");
  });
});
