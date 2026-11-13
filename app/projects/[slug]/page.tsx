import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/BrandIcons";
import { Container } from "@/components/shared/Container";
import { JsonLd } from "@/components/shared/JsonLd";
import { ShimmerImage } from "@/components/shared/ShimmerImage";
import { ProjectShowcase } from "@/components/sections/projects/ProjectShowcase";
import { TechBadge } from "@/components/sections/projects/TechBadge";
import { getProjectBySlug, getProjects } from "@/lib/data/projects";
import {
  breadcrumbJsonLd,
  pageMetadata,
  projectJsonLd,
  projectPath,
  truncateText,
} from "@/lib/seo";
import type { Project } from "@/lib/types";

// Content comes from MySQL, so render per request instead of at build time
// (CI and image builds have no database).
export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

const galleryOf = (project: Project) =>
  project.images?.length ? project.images : [{ src: project.image, alt: project.title }];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: false } };
  }

  const cover = galleryOf(project)[0];
  return pageMetadata({
    title: project.title,
    description: truncateText(project.description),
    path: projectPath(project.id),
    // The project's own first screenshot, so a shared link shows this project.
    image: { url: cover.src, alt: cover.alt },
    keywords: project.tags,
  });
}

function NeighbourCard({ project, label }: { project: Project; label: string }) {
  return (
    <Link
      href={projectPath(project.id)}
      className="group flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-3 transition-colors hover:border-primary/60"
    >
      <span className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg border-2 border-border bg-surface sm:w-28">
        <ShimmerImage src={project.image} alt="" fill sizes="112px" className="object-cover object-top" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="mt-0.5 block font-heading text-sm font-bold leading-snug text-foreground group-hover:text-primary">
          {project.title}
        </span>
      </span>
    </Link>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProjectBySlug(slug), getProjects()]);
  if (!project) notFound();

  const images = galleryOf(project);
  const githubLinks = project.githubUrl ?? [];
  const position = all.findIndex((p) => p.id === project.id);
  const previous = all.length > 1 ? all[(position - 1 + all.length) % all.length] : undefined;
  const next = all.length > 1 ? all[(position + 1) % all.length] : undefined;

  return (
    <div className="bg-background pb-20 pt-28 md:pb-28 md:pt-36">
      <JsonLd data={projectJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Projects", path: "/projects" },
          { name: project.title, path: projectPath(project.id) },
        ])}
      />

      <Container>
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          All projects
        </Link>

        <div className="mt-2 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <ProjectShowcase images={images} title={project.title} />

          <article className="flex min-w-0 flex-col gap-5">
            <div>
              <span className="inline-block rounded-full border border-border bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                {project.category}
              </span>
            </div>

            <h1 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-4xl">
              {project.title}
            </h1>

            <p className="leading-relaxed text-body">{project.description}</p>

            {(project.liveUrl || githubLinks.length > 0) && (
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    Visit live site
                  </a>
                )}
                {githubLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-foreground/80 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
                  >
                    <GithubIcon size={15} />
                    {githubLinks.length > 1 ? `${link.label} code` : "View code"}
                  </a>
                ))}
              </div>
            )}

            <section aria-labelledby="built-with" className="flex flex-col gap-2.5">
              <h2 id="built-with" className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Built with
              </h2>
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <TechBadge tag={tag} />
                  </li>
                ))}
              </ul>
            </section>

            <dl className="grid grid-cols-2 gap-4 border-t-2 border-border pt-4 text-sm">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Category</dt>
                <dd className="mt-0.5 font-semibold text-foreground">{project.category}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Screens</dt>
                <dd className="mt-0.5 font-semibold text-foreground">{images.length}</dd>
              </div>
            </dl>
          </article>
        </div>

        {previous && next && (
          <nav aria-label="More projects" className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2">
            <NeighbourCard project={previous} label="Previous project" />
            <NeighbourCard project={next} label="Next project" />
          </nav>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
          >
            See all projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
