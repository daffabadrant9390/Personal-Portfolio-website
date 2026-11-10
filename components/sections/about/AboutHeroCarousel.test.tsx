import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { AboutHeroCarousel } from "./AboutHeroCarousel";

function mockMatchMedia(desktop: boolean, reduced = false) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("min-width") ? desktop : query.includes("reduce") ? reduced : false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

function activeBullet() {
  return screen.getAllByRole("button", { name: /Show photo/ }).findIndex((b) => b.getAttribute("aria-current") === "true");
}

describe("AboutHeroCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows one active slide and hides the others from screen readers", () => {
    mockMatchMedia(true);
    render(<AboutHeroCarousel />);
    const slides = Array.from(document.querySelectorAll("[aria-roledescription=\"slide\"]"));
    expect(slides).toHaveLength(6);
    expect(slides.filter((s) => s.getAttribute("aria-hidden") === "false")).toHaveLength(1);
  });

  it("advances to the next photo every 1.5 seconds on desktop", () => {
    mockMatchMedia(true);
    render(<AboutHeroCarousel />);
    expect(activeBullet()).toBe(0);
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(activeBullet()).toBe(1);
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(activeBullet()).toBe(2);
  });

  it("pauses on hover and from the pause button", () => {
    mockMatchMedia(true);
    render(<AboutHeroCarousel />);
    const region = screen.getByRole("group", { name: "Photos of Daffa" });
    fireEvent.mouseEnter(region);
    act(() => {
      vi.advanceTimersByTime(4500);
    });
    expect(activeBullet()).toBe(0);
    fireEvent.mouseLeave(region);
    fireEvent.click(screen.getByRole("button", { name: "Pause photo carousel" }));
    act(() => {
      vi.advanceTimersByTime(4500);
    });
    expect(activeBullet()).toBe(0);
    expect(screen.getByRole("button", { name: "Play photo carousel" })).toBeInTheDocument();
  });

  it("does not autoplay under reduced motion or on small screens", () => {
    mockMatchMedia(true, true);
    const { unmount } = render(<AboutHeroCarousel />);
    act(() => {
      vi.advanceTimersByTime(4500);
    });
    expect(activeBullet()).toBe(0);
    unmount();
    mockMatchMedia(false);
    render(<AboutHeroCarousel />);
    act(() => {
      vi.advanceTimersByTime(4500);
    });
    expect(activeBullet()).toBe(0);
  });

  it("jumps to a photo when its bullet is clicked", () => {
    mockMatchMedia(false);
    render(<AboutHeroCarousel />);
    fireEvent.click(screen.getByRole("button", { name: "Show photo 4 of 6" }));
    expect(activeBullet()).toBe(3);
  });
});
