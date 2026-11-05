import * as React from "react";

type MotionProps = Record<string, unknown> & { children?: React.ReactNode };
type MotionComponent = (props: MotionProps) => React.ReactElement;

// Props that only framer-motion understands; they must not reach the DOM.
const MOTION_ONLY_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "layoutId",
  "layout",
  "variants",
  "viewport",
  "whileHover",
  "whileTap",
  "whileInView",
  "drag",
  "dragControls",
  "dragConstraints",
  "dragElastic",
  "dragListener",
  "onDragEnd",
]);

const cache = new Map<string, MotionComponent>();

function getMotionComponent(tag: string): MotionComponent {
  const cached = cache.get(tag);
  if (cached) return cached;

  const Component = ({ children, ...props }: MotionProps) => {
    const domProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !MOTION_ONLY_PROPS.has(key))
    );
    return React.createElement(tag, domProps, children);
  };
  Component.displayName = `motion.${tag}`;
  cache.set(tag, Component);
  return Component;
}

/**
 * Deterministic stand-in for framer-motion in unit tests: renders plain DOM
 * elements, never animates, and unmounts AnimatePresence children immediately.
 * Use it with: vi.mock("framer-motion", () => import("@/test-utils/framer-motion-mock"))
 */
export const motion = new Proxy({} as Record<string, MotionComponent>, {
  get: (_target, tag) => getMotionComponent(String(tag)),
});

export function AnimatePresence({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function useInView() {
  return true;
}

export function useDragControls() {
  return { start: () => undefined };
}
