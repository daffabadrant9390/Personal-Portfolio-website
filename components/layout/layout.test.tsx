import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const themeState = vi.hoisted(() => ({ theme: "dark", setTheme: vi.fn() }));
const pathState = vi.hoisted(() => ({ pathname: "/" }));
const breakpoint = vi.hoisted(() => ({ isDesktop: true }));
const toggleMobileMenu = vi.hoisted(() => vi.fn());

vi.mock("framer-motion", () => import("@/test-utils/framer-motion-mock"));
vi.mock("next-themes", () => ({ useTheme: () => themeState }));
vi.mock("next/navigation", () => ({ usePathname: () => pathState.pathname }));
vi.mock("@/lib/hooks/useBreakpoint", () => ({
  useBreakpoint: () => ({ isDesktop: breakpoint.isDesktop }),
}));
vi.mock("@/lib/store/useUIStore", () => ({
  useUIStore: () => ({ toggleMobileMenu }),
}));
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

beforeEach(() => {
  themeState.theme = "dark";
  themeState.setTheme.mockClear();
  toggleMobileMenu.mockClear();
  pathState.pathname = "/";
  breakpoint.isDesktop = true;
});

describe("Footer", () => {
  it("renders quick links, legal links and the current year", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("renders social links that open in a new tab", () => {
    render(<Footer />);
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:/)
    );
  });

  it.each([
    ["dark", "/logo-dark.png"],
    ["light", "/logo-light.png"],
  ])("shows the %s logo after mount", (theme, src) => {
    themeState.theme = theme;
    render(<Footer />);
    expect(screen.getByAltText("DAFFA logo")).toHaveAttribute("src", src);
  });
});

describe("Navbar", () => {
  it("shows desktop navigation and CTA on desktop", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "Let's Talk" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Open menu" })).not.toBeInTheDocument();
  });

  it("shows only the hamburger on mobile and toggles the menu", async () => {
    breakpoint.isDesktop = false;
    const user = userEvent.setup();
    render(<Navbar />);

    expect(screen.queryByRole("link", { name: "Let's Talk" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(toggleMobileMenu).toHaveBeenCalledTimes(1);
  });

  it("marks the active route with an indicator", () => {
    pathState.pathname = "/about";
    const { container } = render(<Navbar />);
    const about = screen.getByRole("link", { name: "About" });
    expect(about.querySelector("span.absolute")).not.toBeNull();
    expect(container.querySelectorAll("span.absolute")).toHaveLength(1);
  });

  it.each([
    ["dark", "light"],
    ["light", "dark"],
  ])("toggles theme from %s to %s", async (current, next) => {
    themeState.theme = current;
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: "Toggle theme" }));
    expect(themeState.setTheme).toHaveBeenCalledWith(next);
  });

  it("adds the scrolled style after scrolling past 20px", () => {
    render(<Navbar />);
    const header = screen.getByRole("banner");
    expect(header.className).toContain("bg-transparent");

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header.className).toContain("backdrop-blur-xl");

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header.className).toContain("bg-transparent");
  });
});
