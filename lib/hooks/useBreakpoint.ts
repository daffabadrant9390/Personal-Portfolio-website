"use client";

import { useState, useEffect } from "react";

/**
 * Pixel thresholds that mirror Tailwind's default breakpoints.
 * md  = 768  → anything below is considered "mobile"
 * lg  = 1024 → anything at or above is considered "desktop"
 * The gap between the two (768–1023) is "tablet" — neither flag is true.
 */
export const BREAKPOINTS = {
  md: 768,
  lg: 1024,
} as const;

export interface BreakpointState {
  /** true when viewport width < 768px */
  isMobile: boolean;
  /** true when viewport width >= 1024px */
  isDesktop: boolean;
  /** raw viewport width in pixels (0 on the server) */
  currentScreenWidth: number;
}

function deriveState(width: number): BreakpointState {
  return {
    currentScreenWidth: width,
    isMobile: width < BREAKPOINTS.md,
    isDesktop: width >= BREAKPOINTS.lg,
  };
}

/**
 * SSR default: assume desktop so the initial server-rendered HTML and the
 * first client paint agree, avoiding a hydration mismatch.
 * currentScreenWidth is 0 to signal "not yet measured on the client".
 */
const SSR_DEFAULT: BreakpointState = {
  isMobile: false,
  isDesktop: true,
  currentScreenWidth: 0,
};

/**
 * Returns responsive breakpoint flags and the current viewport width.
 *
 * Uses a single ResizeObserver on <html> instead of throttling window resize
 * events — more efficient and fires synchronously after layout.
 *
 * Safe to call in both Server and Client Components (returns SSR_DEFAULT
 * during SSR / before the first effect runs).
 *
 * @example
 * const { isMobile, isDesktop, currentScreenWidth } = useBreakpoint();
 */
export function useBreakpoint(): BreakpointState {
  const [state, setState] = useState<BreakpointState>(SSR_DEFAULT);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      // innerWidth is more reliable than contentRect.width for the viewport
      // because it accounts for browser chrome and scrollbar behaviour.
      setState(deriveState(window.innerWidth));
    });

    // ResizeObserver fires its callback once synchronously upon the first
    // observe() call, so this also handles the initial mount sync — no
    // separate setState needed.
    observer.observe(document.documentElement);

    return () => observer.disconnect();
  }, []);

  return state;
}
