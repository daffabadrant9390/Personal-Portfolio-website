import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/shared/BrandIcons";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { projects } from "@/lib/data/portfolio";
import type { Project } from "@/lib/types";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex-none rounded-xl
                    w-[240px] sm:w-[280px] md:w-[300px]
                    border border-border bg-card overflow-hidden
                    hover:border-blue-200 dark:hover:border-blue-900/40
                    transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-36 sm:h-40 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 300px, (min-width: 640px) 280px, 240px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
        {/* Link overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                        bg-black/40 backdrop-blur-sm">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg
                         bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              <GithubIcon size={14} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg
                         bg-blue-700/80 hover:bg-blue-700 text-white transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading text-xs sm:text-sm font-semibold text-foreground mb-1
                       group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 dark:bg-slate-800/60
                         px-1.5 py-0.5 text-[9px] sm:text-[10px]
                         font-medium text-slate-600 dark:text-slate-400
                         border border-slate-200 dark:border-slate-700/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  projects,
  direction,
}: {
  projects: Project[];
  direction: "left" | "right";
}) {
  const items = [...projects, ...projects, ...projects];
  const cls =
    direction === "left"
      ? "animate-marquee-left hover:[animation-play-state:paused]"
      : "animate-marquee-right hover:[animation-play-state:paused]";

  return (
    <div className="overflow-hidden w-full">
      <div className={`flex gap-4 w-max ${cls}`}>
        {items.map((project, i) => (
          <ProjectCard key={`${project.id}-${i}`} project={project} />
        ))}
      </div>
    </div>
  );
}

export function FeaturedProjectsSection() {
  const row1 = projects.slice(0, 3);
  const row2 = projects.slice(3, 6);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-background">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <Container>
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10 md:mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest
                             text-blue-600 dark:text-blue-400 mb-3 block">
              {"// Projects"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground md:text-4xl">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold
                       text-blue-600 dark:text-blue-400
                       hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            View All Projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </Container>

      {/* Full-bleed marquee rows — 1 row on mobile, 2 on desktop.
          Second row is CSS-hidden below md so no breakpoint hook is needed. */}
      <div className="space-y-4">
        <MarqueeRow projects={row1} direction="left" />
        <div className="hidden md:block">
          <MarqueeRow projects={row2} direction="right" />
        </div>
      </div>

      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-20
                      bg-linear-to-r from-background to-transparent
                      pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-20
                      bg-linear-to-l from-background to-transparent
                      pointer-events-none z-10" />
    </section>
  );
}
