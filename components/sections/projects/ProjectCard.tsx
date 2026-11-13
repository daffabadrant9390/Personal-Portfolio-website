import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/BrandIcons";
import { ProjectGallery } from "@/components/sections/projects/ProjectGallery";
import { TechBadge } from "@/components/sections/projects/TechBadge";
import { projectPath } from "@/lib/seo";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

/**
 * A project in the list. The title is a real link to the project's own page and
 * it is stretched over the whole card (the ::after layer), so the card is one
 * big click target while search engines still see a normal anchor. The gallery
 * arrows and the external links sit above that layer and keep working.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all focus-within:ring-2 focus-within:ring-ring/20 hover:border-primary hover:shadow-sm">
      <div className="relative">
        <ProjectGallery
          images={project.images?.length ? project.images : [{ src: project.image, alt: project.title }]}
          heightClass="h-44 sm:h-48"
        />
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 font-heading text-base font-bold text-foreground">
          <Link
            href={projectPath(project.id)}
            className="outline-none after:absolute after:inset-0 after:z-[5] after:content-[''] group-hover:text-primary"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span key={tag} className={i === 3 ? "hidden shrink-0 sm:inline-flex" : "inline-flex shrink-0"}>
              <TechBadge tag={tag} />
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex shrink-0 items-center rounded-md border border-border bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground sm:hidden">
              +{project.tags.length - 3}
            </span>
          )}
          {project.tags.length > 4 && (
            <span className="hidden shrink-0 items-center rounded-md border border-border bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground sm:inline-flex sm:text-[11px]">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-border pt-3">
          <span className="inline-flex h-9 items-center gap-1.5 text-xs font-semibold text-primary" aria-hidden="true">
            View project
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>

          <span className="ml-auto flex items-center gap-2">
            {(project.githubUrl ?? []).map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${link.label} GitHub repository for ${project.title}`}
                title={`Open GitHub (${link.label})`}
                className="relative z-10 flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
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
                aria-label={`Open live demo for ${project.title}`}
                title="Open live demo"
                className="relative z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-leaf/40 hover:text-leaf"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
