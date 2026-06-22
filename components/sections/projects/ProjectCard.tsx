"use client";

import { Eye, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { ProjectGallery } from "@/components/sections/projects/ProjectGallery";
import { TechBadge } from "@/components/sections/projects/TechBadge";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden
                    hover:border-blue-200 dark:hover:border-blue-900/40 hover:shadow-sm transition-all">
      <div className="relative">
        <ProjectGallery
          images={project.images?.length ? project.images : [project.image]}
          alt={project.title}
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
          {project.tags.map((tag) => (
            <TechBadge key={tag} tag={tag} />
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-3 border-t border-border">
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            aria-label={`See details for ${project.title}`}
            title="See details"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border
                       text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400
                       hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <Eye size={15} />
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open GitHub repository for ${project.title}`}
              title="Open GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border
                         text-muted-foreground hover:text-foreground
                         hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            >
              <FaGithub size={15} />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo for ${project.title}`}
              title="Open live demo"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border
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
