import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { ProjectsExplorer } from "@/components/sections/projects/ProjectsExplorer";
import { projects } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of shipped projects spanning distributed systems, high-performance APIs, and full stack applications.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | M. Daffa Badranthoriq",
    description:
      "A selection of shipped projects spanning distributed systems, high-performance APIs, and full stack applications.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-background overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        h-[400px] w-[600px] rounded-full
                        bg-blue-100/40 dark:bg-blue-900/8 blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <AnimatedSection>
            <span className="text-xs font-semibold uppercase tracking-widest
                             text-blue-600 dark:text-blue-400 mb-4 block font-mono">
              {/* // Projects */}
            </span>
            <h1 className="font-heading font-bold leading-[1.1] tracking-tight text-foreground
                           text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Things I&apos;ve{" "}
              <span className="gradient-text">built and shipped.</span>
            </h1>
            <p className="mt-4 md:mt-6 max-w-lg text-sm sm:text-base md:text-lg
                          leading-relaxed text-muted-foreground">
              A collection of products and systems I&apos;ve designed, built, and shipped
              across fintech, edtech, and infrastructure.
            </p>
          </AnimatedSection>
        </Container>

        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </section>

      {/* ── Filters + Grid ───────────────────────────────── */}
      <section className="pb-24 bg-background">
        <Container>
          <ProjectsExplorer projects={projects} />
        </Container>
      </section>

    </main>
  );
}
