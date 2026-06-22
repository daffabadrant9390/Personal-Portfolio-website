"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Briefcase, ArrowRight, Code2, Database,
  Server, Gauge, CheckCircle2, Download,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { ExperienceCard } from "@/components/sections/about/ExperienceCard";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";

/* ─────────────────────────────────────────────────────────
   Technical Matrix — page-specific content (not in store)
───────────────────────────────────────────────────────── */
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const MATRIX_ICON_MAP: Record<string, string> = {
  react:             `${DEVICON_BASE}/react/react-original.svg`,
  nextjs:            `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  typescript:        `${DEVICON_BASE}/typescript/typescript-original.svg`,
  tailwindcss:       `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  sass:              `${DEVICON_BASE}/sass/sass-original.svg`,
  redux:             `${DEVICON_BASE}/redux/redux-original.svg`,
  html5:             `${DEVICON_BASE}/html5/html5-original.svg`,
  angularjs:         `${DEVICON_BASE}/angularjs/angularjs-original.svg`,
  flutter:           `${DEVICON_BASE}/flutter/flutter-original.svg`,
  go:                `${DEVICON_BASE}/go/go-original.svg`,
  nodejs:            `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  python:            `${DEVICON_BASE}/python/python-original.svg`,
  mysql:             `${DEVICON_BASE}/mysql/mysql-original.svg`,
  googlecloud:       `${DEVICON_BASE}/googlecloud/googlecloud-original.svg`,
  redis:             `${DEVICON_BASE}/redis/redis-original.svg`,
  mongodb:           `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  firebase:          `${DEVICON_BASE}/firebase/firebase-original.svg`,
  supabase:          `${DEVICON_BASE}/supabase/supabase-original.svg`,
  docker:            `${DEVICON_BASE}/docker/docker-original.svg`,
  kubernetes:        `${DEVICON_BASE}/kubernetes/kubernetes-plain.svg`,
  amazonwebservices: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  linux:             `${DEVICON_BASE}/linux/linux-original.svg`,
  git:               `${DEVICON_BASE}/git/git-original.svg`,
  webpack:           `${DEVICON_BASE}/webpack/webpack-original.svg`,
  babel:             `${DEVICON_BASE}/babel/babel-original.svg`,
  jest:              `${DEVICON_BASE}/jest/jest-plain.svg`,
  github:            `${DEVICON_BASE}/github/github-original.svg`,
  jira:              `${DEVICON_BASE}/jira/jira-original.svg`,
  figma:             `${DEVICON_BASE}/figma/figma-original.svg`,
  vscode:            `${DEVICON_BASE}/vscode/vscode-original.svg`,
};

/* Icons that are black/dark and need to be inverted in dark mode */
const DARK_INVERT_ICONS = new Set(["nextjs", "github"]);

function MatrixTechChip({ name, icon }: { name: string; icon: string }) {
  const src = MATRIX_ICON_MAP[icon];
  return (
    <div className="group flex flex-col items-center gap-1.5 rounded-xl
                    border border-border bg-background/60
                    w-[4.25rem] py-3 px-1
                    hover:border-blue-300 dark:hover:border-blue-800
                    hover:bg-blue-50/40 dark:hover:bg-blue-950/10
                    transition-all duration-200 cursor-default">
      <div className="h-6 w-6 flex items-center justify-center">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className={`h-5 w-5 object-contain
                        transition-transform duration-200 group-hover:scale-110
                        ${DARK_INVERT_ICONS.has(icon) ? "dark:invert" : ""}`}
            loading="lazy"
          />
        ) : (
          <span className="text-[10px] font-bold text-muted-foreground">
            {name.substring(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="text-[10px] text-muted-foreground group-hover:text-foreground
                       transition-colors text-center leading-tight px-0.5">
        {name}
      </span>
    </div>
  );
}

const TECH_MATRIX = [
  {
    id: "frontend",
    Icon: Code2,
    label: "Frontend & Mobile",
    accentClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-950/50",
    borderClass: "hover:border-blue-300 dark:hover:border-blue-700/60",
    // description: "Modern web interfaces, performance & SEO, and cross-platform UX",
    skills: [
      { name: "React.js",   icon: "react" },
      { name: "Next.js",    icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind",   icon: "tailwindcss" },
      { name: "SASS",       icon: "sass" },
      { name: "Redux",      icon: "redux" },
      { name: "HTML5",      icon: "html5" },
      { name: "Angular.js", icon: "angularjs" },
      { name: "Flutter",    icon: "flutter" },
    ],
  },
  {
    id: "backend",
    Icon: Database,
    label: "Backend & Data",
    accentClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-950/50",
    borderClass: "hover:border-blue-300 dark:hover:border-blue-700/60",
    // description: "Distributed APIs, LLM & AI integration, and multi-region data platforms",
    skills: [
      { name: "Golang",     icon: "go" },
      { name: "Node.js",    icon: "nodejs" },
      { name: "Python",     icon: "python" },
      { name: "MySQL",      icon: "mysql" },
      { name: "BigQuery",   icon: "googlecloud" },
      { name: "Redis",      icon: "redis" },
      { name: "MongoDB",    icon: "mongodb" },
      { name: "Firebase",   icon: "firebase" },
      { name: "Supabase",   icon: "supabase" },
    ],
  },
  {
    id: "devops",
    Icon: Server,
    label: "DevOps & Cloud",
    accentClass: "text-red-700 dark:text-red-400",
    bgClass: "bg-red-100/60 dark:bg-red-950/30",
    borderClass: "hover:border-red-300 dark:hover:border-red-700/60",
    // description: "Multi-region infrastructure, CI/CD pipelines, and containerization",
    skills: [
      { name: "Docker",     icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "AWS",        icon: "amazonwebservices" },
      { name: "Linux",      icon: "linux" },
      { name: "Git",        icon: "git" },
      { name: "Webpack",    icon: "webpack" },
      { name: "Babel",      icon: "babel" },
    ],
  },
  {
    id: "practices",
    Icon: Gauge,
    label: "Testing & Delivery",
    accentClass: "text-red-700 dark:text-red-400",
    bgClass: "bg-red-100/60 dark:bg-red-950/30",
    borderClass: "hover:border-red-300 dark:hover:border-red-700/60",
    // description: "90%+ test coverage, full dev lifecycle ownership, and agile leadership",
    skills: [
      { name: "Jest",    icon: "jest" },
      { name: "GitHub",  icon: "github" },
      { name: "Jira",    icon: "jira" },
      { name: "Figma",   icon: "figma" },
      { name: "VS Code", icon: "vscode" },
    ],
  },
];

const STATS = [
  { value: "4+",  label: "Years of exp." },
  { value: "12+", label: "Projects shipped" },
  { value: "3",   label: "Companies" },
  { value: "99%", label: "Uptime SLA" },
];

const VALUES = [
  "Architecture over shortcuts",
  "Performance by default",
  "Clean code as a craft",
  "Honest collaboration",
];

const SPECIALIZATIONS = [
  "LLM & Prompt Engineering",
  "Web Performance & Accessibility",
  "Multi-Region Platform Dev",
  "Progressive Web Apps (PWA)",
  "State Management",
  "Algorithms & Data Structures",
  "Object-Oriented Programming",
  "CI/CD Pipelines",
  "Technical Documentation",
];

const SOFT_SKILLS = [
  "Leadership",
  "Communication",
  "Collaboration",
  "Problem Solving",
  "Adaptability",
  "Stakeholder Management",
  "Agile / Scrum Methodology",
  "Self-Driven & Autonomous",
  "Data-Driven Decision Making",
  "Growth Mindset",
];

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */
export default function AboutPage() {
  const { experiences } = usePortfolioStore();

  return (
    <main className="min-h-screen bg-background">

      {/* ════════════════════════════════════════════════════
          § 1 — HERO
      ════════════════════════════════════════════════════ */}
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

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06, ease: "easeOut" }}
                className="font-heading text-4xl font-bold leading-[1.1] tracking-tight
                           text-foreground sm:text-5xl md:text-[3.5rem]"
              >
                The engineer
                <br />
                <span className="gradient-text">behind the stack.</span>
              </motion.h1>

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

      {/* ════════════════════════════════════════════════════
          § 2 — BIO + PHOTO
      ════════════════════════════════════════════════════ */}
      <section className="bg-background py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[340px_1fr] lg:gap-16 lg:items-start">

            {/* Photo column */}
            <AnimatedSection direction="left">
              <div className="relative">
                {/* Fixed height on mobile → portrait aspect on desktop */}
                <div className="relative overflow-hidden rounded-2xl border border-border
                                h-[240px] sm:h-[300px] lg:h-auto lg:aspect-4/5
                                bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="/profile-img-1.webp"
                    alt="Daffa — Full Stack Engineer"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 340px"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t
                                  from-background/40 via-transparent to-transparent" />
                </div>

                {/* Floating availability badge */}
                <div className="absolute -bottom-4 left-4 right-4
                                rounded-xl border border-border bg-card/95 backdrop-blur-sm
                                px-4 py-3 flex items-center gap-3 shadow-lg">
                  <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/40
                                  flex items-center justify-center shrink-0">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Open to Work</p>
                    <p className="text-[10px] text-muted-foreground">
                      Freelance · Full-time · Contract
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Bio text column */}
            <div className="space-y-6 pt-6 lg:pt-0">
              <AnimatedSection direction="right">
                <span className="mb-3 block font-mono text-xs font-semibold uppercase
                  tracking-widest text-muted-foreground">
                  {/* // Who I Am */}
                </span>
                <h2 className="font-heading text-2xl font-bold text-foreground
                               sm:text-3xl leading-tight">
                  Deliberate by design.{" "}
                  <span className="gradient-text">Precise by habit.</span>
                </h2>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.07}>
                <div className="space-y-3 text-muted-foreground leading-relaxed text-[15px]">
                  <p>
                    Full Stack Engineer based in Jakarta, building distributed systems,
                    high-performance APIs, and the interfaces that sit on top of them.
                    Four years of shipping production software across fintech, edtech,
                    and infrastructure.
                  </p>
                  <p>
                    I build with architecture first — stripping complexity until only the
                    essential logic remains. Aerospace is my mental model for software:
                    every component intentional, every dependency justified.
                  </p>
                </div>
              </AnimatedSection>

              {/* Values */}
              <AnimatedSection direction="right" delay={0.13}>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest
                  text-muted-foreground">
                  Core Principles
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {VALUES.map((v) => (
                    <div
                      key={v}
                      className="flex items-start gap-2.5 rounded-lg border border-border
                      bg-card px-3.5 pb-2.5 pt-6"
                    >
                      <CheckCircle2
                        size={14}
                        className="shrink-0 text-blue-600 dark:text-blue-400"
                      />
                      <span className="text-sm text-foreground">{v}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          § 3 — CAREER JOURNEY (full vertical timeline)
      ════════════════════════════════════════════════════ */}
      <section className="relative bg-background py-14 md:py-20 lg:py-28">
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        <Container>
          {/* Header */}
          <AnimatedSection>
            <div className="mb-12 md:mb-16 max-w-xl">
              <span className="mb-3 block font-mono text-xs font-semibold uppercase
                tracking-widest text-blue-600 dark:text-blue-400">
                {/* // Career Journey */}
              </span>
              <h2 className="font-heading text-2xl font-bold text-foreground
                text-muted-foreground sm:text-3xl md:text-4xl">
                Where I&apos;ve been,{" "}
                <span className="gradient-text">what I&apos;ve built.</span>
              </h2>
            </div>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical connecting line — centered on dot column */}
            <div className="absolute left-3.5 sm:left-5 top-2 bottom-2 w-px bg-border" />

            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <AnimatedSection key={exp.id} delay={i * 0.1} direction="left">
                  <div className="flex items-start gap-3 sm:gap-4">

                    {/* Dot column — in normal flow so sticky works */}
                    <div className="flex-none w-7 sm:w-10 flex justify-center">
                      <div className={`sticky top-[72px] z-20 mt-4
                                       flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center
                                       rounded-full border-2 bg-background
                                       ${exp.current ? "border-emerald-500" : "border-border"}`}
                      >
                        {exp.current ? (
                          <>
                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span className="absolute inset-0 rounded-full border-2
                                             border-emerald-400 animate-ping opacity-30" />
                          </>
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                        )}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 min-w-0">
                      <ExperienceCard experience={exp} defaultExpanded={i === 0} />
                    </div>

                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </section>

      {/* ════════════════════════════════════════════════════
          § 4 — TECHNICAL MATRIX
      ════════════════════════════════════════════════════ */}
      <section className="bg-background py-14 md:py-20 lg:py-28">
        <Container>
          {/* Header */}
          <AnimatedSection>
            <div className="mb-12 md:mb-16 max-w-xl">
              <span className="mb-3 block font-mono text-xs font-semibold uppercase
                               tracking-widest text-blue-600 dark:text-blue-400">
                {/* // Technical Matrix */}
              </span>
              <h2 className="font-heading text-2xl font-bold text-foreground
                             sm:text-3xl md:text-4xl">
                Tools I trust.{" "}
                <span className="gradient-text">Disciplines I master.</span>
              </h2>
            </div>
          </AnimatedSection>

          {/* 2×2 grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TECH_MATRIX.map((cat, i) => (
              <AnimatedSection key={cat.id} delay={i * 0.08} direction="up">
                <div className={`h-full rounded-2xl border border-border bg-card p-6 sm:p-7
                                 transition-all ${cat.borderClass}`}>

                  {/* Category header */}
                  <div className="flex items-center gap-4  mb-3 md: mb-5">
                    <div className={`h-8 w-8 rounded-xl flex items-center justify-center
                                     shrink-0 ${cat.bgClass}`}>
                      <cat.Icon size={14} className={cat.accentClass} />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5
                                     ${cat.accentClass}`}>
                        {cat.label}
                      </p>
                      {/* <p className="text-sm text-muted-foreground leading-snug">
                        {cat.description}
                      </p> */}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border mb-3 md:mb-5" />

                  {/* Tech icon chips */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {cat.skills.map((skill) => (
                      <MatrixTechChip key={skill.name} name={skill.name} icon={skill.icon} />
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Specializations */}
          <AnimatedSection delay={0.12}>
            <div className="mt-8 space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest
                            text-muted-foreground">
                Specializations
              </p>
              <div className="flex flex-wrap gap-2">
                {SPECIALIZATIONS.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-blue-200 dark:border-blue-900/40
                               bg-blue-50 dark:bg-blue-950/20
                               px-3 py-1 text-xs font-medium
                               text-blue-700 dark:text-blue-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Soft Skills */}
          <AnimatedSection delay={0.18}>
            <div className="mt-5 space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest
                            text-muted-foreground">
                Soft Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-border bg-card/60
                               px-3 py-1 text-xs text-muted-foreground
                               hover:text-foreground transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          § 5 — CTA
      ════════════════════════════════════════════════════ */}
      <section className="relative bg-background pb-20 md:pb-24 lg:pb-32">
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        <Container className="pt-14 md:pt-20 lg:pt-24">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 md:p-14
                            text-center max-w-3xl mx-auto">
              <span className="mb-3 block font-mono text-xs font-semibold uppercase
                               tracking-widest text-blue-600 dark:text-blue-400">
                {/* // What&apos;s Next */} 
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold
                             text-foreground leading-tight mb-4">
                Curious what I&apos;ve shipped?
                <br />
                <span className="gradient-text">Or want to build together?</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-8">
                Browse the projects that shaped me as an engineer, or reach out directly
                — I respond within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/projects"
                  className="group inline-flex items-center justify-center gap-2
                             rounded-xl bg-blue-700 hover:bg-blue-600
                             px-7 py-3 text-sm font-semibold text-white
                             shadow-md shadow-blue-700/20 transition-all"
                >
                  View Projects
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2
                             rounded-xl border border-border bg-background
                             px-7 py-3 text-sm font-semibold text-foreground
                             hover:border-blue-300 dark:hover:border-blue-700
                             hover:bg-blue-50 dark:hover:bg-blue-950/20
                             transition-all"
                >
                  Get in Touch
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

    </main>
  );
}
