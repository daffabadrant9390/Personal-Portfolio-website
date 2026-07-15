"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/BrandIcons";
import { ResponsiveOverlay } from "@/components/shared/ResponsiveOverlay";
import { ProjectGallery } from "@/components/sections/projects/ProjectGallery";
import { TechBadge } from "@/components/sections/projects/TechBadge";
import type { Project } from "@/lib/types";

interface ProjectDetailsSheetProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailsSheet({ project, onClose }: ProjectDetailsSheetProps) {
  if (!project) return null;

  const hasActions = !!(project.githubUrl || project.liveUrl);

  return (
    <ResponsiveOverlay
      open={!!project}
      onClose={onClose}
      ariaLabel={`${project.title} details`}
      maxWidthClass="max-w-xl"
      header={
        <>
          <span className="mb-2 inline-block rounded-full border border-blue-200 dark:border-blue-900/40
                           bg-blue-50 dark:bg-blue-950/20 px-2.5 py-0.5 text-[10px] font-semibold
                           uppercase tracking-wide text-blue-700 dark:text-blue-300">
            {project.category}
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground">{project.title}</h3>
        </>
      }
      footer={
        hasActions ? (
          <div className="flex flex-col sm:flex-row gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl
                           border border-border bg-background px-4 py-2.5 text-sm font-semibold
                           text-foreground hover:border-blue-300 dark:hover:border-blue-700
                           hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all"
              >
                <GithubIcon size={15} />
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl
                           bg-blue-700 hover:bg-blue-600 px-4 py-2.5 text-sm font-semibold
                           text-white shadow-md shadow-blue-700/20 transition-all"
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
          </div>
        ) : undefined
      }
    >
      <div className="mb-5 overflow-hidden rounded-xl border border-border">
        <ProjectGallery
          images={project.images?.length ? project.images : [{ src: project.image, alt: project.title }]}
          heightClass="h-56 sm:h-64"
        />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <TechBadge key={tag} tag={tag} />
        ))}
      </div>
    </ResponsiveOverlay>
  );
}
