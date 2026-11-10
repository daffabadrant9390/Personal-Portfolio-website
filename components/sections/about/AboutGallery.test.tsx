import { beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AboutGallery } from "./AboutGallery";

beforeAll(() => {
  Element.prototype.scrollBy = vi.fn() as unknown as typeof Element.prototype.scrollBy;
  Element.prototype.scrollTo = vi.fn() as unknown as typeof Element.prototype.scrollTo;
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("AboutGallery", () => {
  it("renders every photo from the R2 assets folder in a labelled region", () => {
    render(<AboutGallery />);
    expect(screen.getByRole("region", { name: /scroll sideways/i })).toBeInTheDocument();
    const photos = screen.getAllByRole("img");
    expect(photos).toHaveLength(6);
    expect(decodeURIComponent(photos[0].getAttribute("src") ?? "")).toContain("about-us-carousel-2.jpeg");
  });

  it("starts at the first photos with the arrows disabled when there is nothing to scroll", async () => {
    render(<AboutGallery />);
    expect(screen.getByRole("button", { name: "Previous photos" })).toBeDisabled();
    // With no layout in jsdom there is a single page, so next is disabled too.
    expect(screen.getByRole("button", { name: "Next photos" })).toBeDisabled();
  });
});
