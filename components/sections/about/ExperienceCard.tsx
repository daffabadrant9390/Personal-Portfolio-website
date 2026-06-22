"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Experience } from "@/lib/types";

interface ExperienceCardProps {
  experience: Experience;
  defaultExpanded?: boolean;
}

export function ExperienceCard({ experience: exp, defaultExpanded = false }: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  return (
    <div className="rounded-2xl border border-border bg-card transition-colors
                    hover:border-blue-200 dark:hover:border-blue-900/40 hover:shadow-sm">

      {/* Always-visible header — sticky below the fixed navbar when expanded */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`w-full text-left px-5 sm:px-6 py-4 sm:py-5 group transition-shadow${
          isOpen
            ? " sticky top-16 z-20 bg-card border-b border-border/50 shadow-md rounded-t-2xl"
            : ""
        }`}
      >
        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0 flex-1 space-y-1">
            {/* Role */}
            <h3 className="font-heading text-sm sm:text-base font-bold text-foreground leading-snug">
              {exp.role}
            </h3>

            {/* Company · Period — location shown only on sm+ */}
            <div className="flex flex-wrap items-center gap-x-1.5 text-xs">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {exp.company}
              </span>
              {exp.location && (
                <span className="hidden sm:inline text-muted-foreground/60">
                  , {exp.location}
                </span>
              )}
              <span className="text-border mx-0.5">·</span>
              <span className="font-mono text-muted-foreground">{exp.period}</span>
            </div>
          </div>

          {/* Chevron — rotates 180° when open */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/60 px-5 sm:px-6 pt-4 pb-5 sm:pb-6 space-y-4">

              {/* Highlights */}
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0
                                       bg-blue-600 dark:bg-blue-500" />
                      <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech tags */}
              {exp.tags && exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-blue-200 dark:border-blue-900/40
                                 bg-blue-50 dark:bg-blue-950/20
                                 px-2 py-0.5 text-[11px] font-medium
                                 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
