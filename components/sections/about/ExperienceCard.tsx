"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Experience } from "@/lib/types";

interface ExperienceCardProps {
  experience: Experience;
  defaultExpanded?: boolean;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((h, j) => (
        <li key={j} className="flex items-start gap-2.5">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-primary" />
          <span className="text-xs sm:text-sm text-body leading-relaxed">{h}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Collapsible experience card. The header stays visible, and the body (bullets,
 * per role sections and tech tags) expands on click. Companies with more than
 * one role list each role with its own period.
 */
export function ExperienceCard({ experience: exp, defaultExpanded = false }: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const typeClass =
    exp.group === "full-time" ? "bg-leaf-soft text-accent-foreground" : "bg-ochre-soft text-ochre";

  return (
    <div className="rounded-2xl border-2 border-border bg-card transition-colors hover:border-primary/50">
      {/* Always visible header, sticky below the fixed navbar when expanded */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`w-full text-left px-5 sm:px-6 py-4 sm:py-5 group transition-shadow${
          isOpen ? " sticky top-16 z-20 bg-card border-b-2 border-border rounded-t-2xl" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="font-heading text-sm sm:text-base font-bold text-foreground leading-snug">
              {exp.role}
            </h3>

            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
              <span className="font-semibold text-primary">{exp.company}</span>
              {exp.location && (
                <span className="hidden sm:inline text-muted-foreground">, {exp.location}</span>
              )}
              <span className="text-border mx-0.5">·</span>
              <span className="font-mono text-muted-foreground">{exp.period}</span>
              <span className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeClass}`}>
                {exp.employmentType}
              </span>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </button>

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
            <div className="border-t-2 border-border px-5 sm:px-6 pt-4 pb-5 sm:pb-6 space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground">{exp.description}</p>

              {exp.roles ? (
                <div className="space-y-5">
                  {exp.roles.map((role) => (
                    <div key={role.title}>
                      <div className="mb-2 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                        <h4 className="text-sm font-semibold text-foreground">{role.title}</h4>
                        <span className="font-mono text-xs text-muted-foreground">{role.period}</span>
                      </div>
                      <Bullets items={role.highlights} />
                    </div>
                  ))}
                </div>
              ) : (
                exp.highlights && exp.highlights.length > 0 && <Bullets items={exp.highlights} />
              )}

              {exp.tags && exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-border">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground"
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
