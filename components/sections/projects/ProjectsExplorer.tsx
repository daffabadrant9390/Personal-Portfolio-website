"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { ProjectFilters, type SortOrder } from "@/components/sections/projects/ProjectFilters";
import { ProjectDetailsSheet } from "@/components/sections/projects/ProjectDetailsSheet";
import type { Project } from "@/lib/types";

interface ProjectsExplorerProps {
  projects: Project[];
}

/**
 * Client island for the projects page: owns the search/category/sort state, the
 * filtered grid, and the details modal. The surrounding page (hero, headings)
 * stays a Server Component — only this interactive slice ships as client JS.
 */
export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
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
    <>
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

      <ProjectDetailsSheet project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
