"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Briefcase, ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/shared/Container";

const STATS = [
  { value: "4+",  label: "Years of exp." },
  { value: "12+", label: "Projects shipped" },
  { value: "3",   label: "Companies" },
  { value: "99%", label: "Uptime SLA" },
];

/**
 * Above-the-fold hero for the About page. Isolated as a client island because
 * it runs bespoke mount animations via framer-motion; the rest of the page
 * stays a Server Component.
 */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-20 md:pt-44 md:pb-28">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-[480px] w-[480px]
                      rounded-full bg-blue-100/50 dark:bg-blue-900/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-20 right-1/4 h-[320px] w-[320px]
                      rounded-full bg-red-100/30 dark:bg-red-900/6 blur-[100px]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

          {/* Left: text */}
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-4 block font-mono text-xs font-semibold uppercase
                         tracking-widest text-blue-600 dark:text-blue-400"
            >
              {/* // About Me */}
            </motion.span>

            {/* Fades up via a plain CSS animation (not framer-motion) — this
                is the LCP candidate, and a JS-driven animation would delay
                LCP until framer-motion hydrates and runs. */}
            <h1
              className="animate-fade-up-about font-heading text-4xl font-bold leading-[1.1] tracking-tight
                         text-foreground sm:text-5xl md:text-[3.5rem]"
            >
              The engineer
              <br />
              <span className="gradient-text">behind the stack.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14, ease: "easeOut" }}
              className="mt-5 max-w-xl text-base leading-relaxed
                         text-muted-foreground sm:text-lg"
            >
              Full Stack Engineer based in Jakarta — specialising in distributed
              systems, high-performance APIs, and the user interfaces that sit on top of them.
            </motion.p>

            {/* Quick pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="mt-6 flex flex-wrap gap-2"
            >
              <div className="flex items-center gap-1.5 rounded-full border border-border
                              bg-card px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Available for hire</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border
                              bg-card px-3 py-1.5">
                <MapPin size={11} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border
                              bg-card px-3 py-1.5">
                <Briefcase size={11} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Full Stack @ Vidato Corp</span>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.26, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-700
                           hover:bg-blue-600 px-5 py-2.5 text-sm font-semibold
                           text-white shadow-md shadow-blue-700/20 transition-all"
              >
                Get in Touch
                <ArrowRight size={14} />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-border
                           bg-card px-5 py-2.5 text-sm font-semibold text-foreground
                           hover:border-blue-300 dark:hover:border-blue-700
                           hover:bg-blue-50 dark:hover:bg-blue-950/20
                           transition-all"
              >
                <Download size={14} />
                Download CV
              </a>
            </motion.div>
          </div>

          {/* Right: stat grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
            className="grid grid-cols-2 gap-3 lg:w-[280px]"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-5
                           flex flex-col gap-1"
              >
                <p className="font-heading text-3xl font-bold text-foreground">
                  {s.value}
                </p>
                <p className="text-[11px] uppercase tracking-wider
                              text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </Container>

      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
