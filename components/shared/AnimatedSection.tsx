"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  /* once:true ensures the observer fires only once — no repeated reflow on scroll back */
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const hiddenState = {
    opacity: 0,
    y: direction === "up" ? 14 : direction === "down" ? -14 : 0,
    x: direction === "left" ? 14 : direction === "right" ? -14 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={hiddenState}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : hiddenState}
      transition={{
        duration: 0.38,
        delay,
        ease: "easeOut",
      }}
      /* GPU-composited properties only (opacity + transform) for smooth 60 fps */
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
