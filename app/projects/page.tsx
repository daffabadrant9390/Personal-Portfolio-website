"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { ProjectFilters, type SortOrder } from "@/components/sections/projects/ProjectFilters";
import { ProjectDetailsSheet } from "@/components/sections/projects/ProjectDetailsSheet";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";
import type { Project } from "@/lib/types";

export default function ProjectsPage() {
  const { projects } = usePortfolioStore();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects]
  );

  const visibleProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = projects.filter((p) => {
      const matchesSearch = !query || p.title.toLowerCase().includes(query);
      const matchesCategory = !activeCategory || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortOrder === "none") return filtered;
    const sorted = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    return sortOrder === "desc" ? sorted.reverse() : sorted;
  }, [projects, search, activeCategory, sortOrder]);

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
          <AnimatedSection delay={0.06} className="mb-10">
            <ProjectFilters
              search={search}
              onSearchChange={setSearch}
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
            />
          </AnimatedSection>

          {visibleProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project, i) => (
                <AnimatedSection key={project.id} delay={0.04 * (i % 6)}>
                  <ProjectCard project={project} onViewDetails={setSelectedProject} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="h-14 w-14 rounded-full bg-card border border-border
                              flex items-center justify-center">
                <SearchX size={22} className="text-muted-foreground" />
              </div>
              <p className="font-heading font-bold text-foreground">No projects found</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Try a different search term or category filter.
              </p>
            </div>
          )}
        </Container>
      </section>

      <ProjectDetailsSheet project={selectedProject} onClose={() => setSelectedProject(null)} />

    </main>
  );
}
