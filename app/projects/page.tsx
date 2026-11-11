import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { ProjectsExplorer } from "@/components/sections/projects/ProjectsExplorer";
import { getProjects } from "@/lib/data/projects";

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

// Content comes from MySQL, so render per request instead of at build time
// (CI and image builds have no database).
export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-background overflow-hidden">


        <Container className="relative z-10">
          <AnimatedSection>
            <h1 className="font-heading font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Things I&apos;ve{" "}
              <span className="text-primary">built and shipped.</span>
            </h1>
            <p className="mt-4 md:mt-6 max-w-lg text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
              Products I have designed, built and shipped across travel, AI and online marketplaces.
            </p>
          </AnimatedSection>
        </Container>
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
