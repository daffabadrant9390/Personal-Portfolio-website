import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BREAKPOINTS, useBreakpoint } from "./useBreakpoint";

class MockResizeObserver {
  static instances: MockResizeObserver[] = [];

  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();

  constructor(private readonly callback: () => void) {
    MockResizeObserver.instances.push(this);
  }

  trigger() {
    this.callback();
  }
}

function resizeTo(width: number) {
  Object.defineProperty(window, "innerWidth", {
    value: width,
    writable: true,
    configurable: true,
  });
  act(() => {
    MockResizeObserver.instances.forEach((observer) => observer.trigger());
  });
}

const originalResizeObserver = globalThis.ResizeObserver;

beforeEach(() => {
  MockResizeObserver.instances = [];
  vi.stubGlobal("ResizeObserver", MockResizeObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
  globalThis.ResizeObserver = originalResizeObserver;
});

describe("BREAKPOINTS", () => {
  it("mirrors Tailwind's md and lg thresholds", () => {
    expect(BREAKPOINTS).toEqual({ md: 768, lg: 1024 });
  });
});

describe("useBreakpoint", () => {
  it("starts with the SSR default (desktop, width 0)", () => {
    const { result } = renderHook(() => useBreakpoint());

    expect(result.current).toEqual({
      isMobile: false,
      isDesktop: true,
      currentScreenWidth: 0,
    });
  });

  it("observes the <html> element", () => {
    renderHook(() => useBreakpoint());

    expect(MockResizeObserver.instances).toHaveLength(1);
    expect(MockResizeObserver.instances[0].observe).toHaveBeenCalledWith(document.documentElement);
  });

  it("reports mobile below 768px", () => {
    const { result } = renderHook(() => useBreakpoint());

    resizeTo(500);

    expect(result.current).toEqual({ isMobile: true, isDesktop: false, currentScreenWidth: 500 });
  });

  it("reports tablet between 768px and 1023px", () => {
    const { result } = renderHook(() => useBreakpoint());

    resizeTo(900);

    expect(result.current).toEqual({ isMobile: false, isDesktop: false, currentScreenWidth: 900 });
  });

  it("reports desktop from 1024px", () => {
    const { result } = renderHook(() => useBreakpoint());

    resizeTo(1440);

    expect(result.current).toEqual({ isMobile: false, isDesktop: true, currentScreenWidth: 1440 });
  });

  it.each([
    [767, true, false],
    [768, false, false],
    [1023, false, false],
    [1024, false, true],
  ])("handles the boundary width %ipx", (width, isMobile, isDesktop) => {
    const { result } = renderHook(() => useBreakpoint());

    resizeTo(width);

    expect(result.current.isMobile).toBe(isMobile);
    expect(result.current.isDesktop).toBe(isDesktop);
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = renderHook(() => useBreakpoint());
    const [observer] = MockResizeObserver.instances;

    unmount();

    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });
});
