import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
