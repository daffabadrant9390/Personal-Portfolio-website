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

  const githubLinks = project.githubUrl ?? [];
  const hasActions = !!(githubLinks.length || project.liveUrl);

  return (
    <ResponsiveOverlay
      open={!!project}
      onClose={onClose}
      ariaLabel={`${project.title} details`}
      maxWidthClass="max-w-xl"
      header={
        <>
          <span className="mb-2 inline-block rounded-full border border-border bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            {project.category}
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground">{project.title}</h3>
        </>
      }
      footer={
        hasActions ? (
          <div className="flex flex-col sm:flex-row gap-3">
            {githubLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:bg-accent transition-all"
              >
                <GithubIcon size={15} />
                {githubLinks.length > 1 ? `${link.label} Code` : "View Code"}
              </a>
            ))}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary hover:opacity-90 px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity"
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
