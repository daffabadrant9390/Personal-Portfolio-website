"use client";

import { Eye, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/BrandIcons";
import { ProjectGallery } from "@/components/sections/projects/ProjectGallery";
import { TechBadge } from "@/components/sections/projects/TechBadge";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onViewDetails(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewDetails(project);
        }
      }}
      aria-label={`See details for ${project.title}`}
      className="group flex cursor-pointer flex-col rounded-2xl border border-border bg-card overflow-hidden
                 hover:border-blue-200 dark:hover:border-blue-900/40 hover:shadow-sm transition-all
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
    >
      <div className="relative">
        <ProjectGallery
          images={project.images?.length ? project.images : [{ src: project.image, alt: project.title }]}
          heightClass="h-44 sm:h-48"
        />
        <span className="absolute top-3 left-3 z-10 rounded-full bg-black/50 backdrop-blur-sm
                         px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-bold text-foreground mb-1.5">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span key={tag} className={i === 3 ? "hidden shrink-0 sm:inline-flex" : "inline-flex shrink-0"}>
              <TechBadge tag={tag} />
            </span>
          ))}
          {project.tags.length > 3 && (
            <span
              className="sm:hidden inline-flex shrink-0 items-center rounded-md border border-border
                         bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground"
            >
              +{project.tags.length - 3}
            </span>
          )}
          {project.tags.length > 4 && (
            <span
              className="hidden sm:inline-flex shrink-0 items-center rounded-md border border-border
                         bg-background px-2 py-1 text-[10px] sm:text-[11px] font-medium text-muted-foreground"
            >
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-3 border-t border-border">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onViewDetails(project); }}
            aria-label={`See details for ${project.title}`}
            title="See details"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border
                       text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400
                       hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <Eye size={15} />
          </button>

          {(project.githubUrl ?? []).map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open ${link.label} GitHub repository for ${project.title}`}
              title={`Open GitHub (${link.label})`}
              className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-border
                         px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground
                         hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            >
              <GithubIcon size={15} />
              {link.label}
            </a>
          ))}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open live demo for ${project.title}`}
              title="Open live demo"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border
                         text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400
                         hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
