import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/shared/BrandIcons";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { projects } from "@/lib/data/portfolio";
import type { Project } from "@/lib/types";
import { ShimmerImage } from "@/components/shared/ShimmerImage";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group relative flex-none rounded-2xl w-[240px] sm:w-[280px] md:w-[300px]
                 border-2 border-border bg-card overflow-hidden
                 hover:border-primary/50 transition-colors duration-300"
    >
      {/* Thumbnail */}
      <div className="relative h-36 sm:h-40 overflow-hidden">
        <ShimmerImage
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 300px, (min-width: 640px) 280px, 240px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
        {/* Link overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3
                     opacity-0 group-hover:opacity-100 focus-within:opacity-100
                     transition-opacity duration-300 bg-black/40 backdrop-blur-sm"
        >
          {(project.githubUrl ?? []).map((link, i, links) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} GitHub repository for ${project.title}`}
              title={`Open GitHub (${link.label})`}
              className={`flex h-8 items-center gap-1 rounded-lg bg-white/15 hover:bg-white/25
                         text-white transition-colors
                         ${links.length > 1 ? "px-2 text-[11px] font-medium" : "w-8 justify-center"}`}
            >
              <GithubIcon size={14} />
              {links.length > 1 && link.label}
            </a>
          ))}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading text-xs sm:text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={tag}
              className={`shrink-0 whitespace-nowrap rounded-md bg-surface px-1.5 py-0.5 text-[9px] sm:text-[10px]
                         font-medium text-body border border-border
                         ${i === 3 ? "hidden sm:inline-flex" : "inline-flex"}`}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="sm:hidden inline-flex shrink-0 rounded-md bg-surface px-1.5 py-0.5 text-[9px] font-medium text-body border border-border">
              +{project.tags.length - 3}
            </span>
          )}
          {project.tags.length > 4 && (
            <span className="hidden sm:inline-flex shrink-0 rounded-md bg-surface px-1.5 py-0.5 text-[10px] font-medium text-body border border-border">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  projects,
  direction,
  duration,
}: {
  projects: Project[];
  direction: "left" | "right";
  duration: string;
}) {
  // Track holds 3 copies so one seamless loop is exactly 1/3 of its width.
  const items = [...projects, ...projects, ...projects];
  const cls =
    direction === "left"
      ? "animate-marquee-left hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
      : "animate-marquee-right hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]";

  return (
    <div className="marquee-mask w-full overflow-hidden">
      <div className={`flex w-max gap-4 ${cls}`} style={{ animationDuration: duration }}>
        {items.map((project, i) => (
          <ProjectCard key={`${project.id}-${i}`} project={project} />
        ))}
      </div>
    </div>
  );
}

export function FeaturedProjectsSection() {
  const row1 = projects.filter((_, i) => i % 2 === 0);
  const row2 = projects.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative overflow-hidden border-t-2 border-border bg-background py-20 md:py-32">
      <Container>
        <AnimatedSection className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end md:mb-12">
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-primary">
              {"// Projects"}
            </span>
            <h2 className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl md:text-4xl">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
          >
            View All Projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </Container>

      {/* Full bleed marquee rows. One row on mobile, two on desktop (second row is CSS hidden below md). */}
      <div className="space-y-4">
        <MarqueeRow projects={row1} direction="left" duration="46s" />
        <div className="hidden md:block">
          <MarqueeRow projects={row2} direction="right" duration="54s" />
        </div>
      </div>
    </section>
  );
}
