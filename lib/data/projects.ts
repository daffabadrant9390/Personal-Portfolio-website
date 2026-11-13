import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getDb } from "@/lib/db";
import { CONTENT_CACHE_TAG, CONTENT_REVALIDATE_SECONDS } from "@/lib/data/cache";
import { assetUrl } from "@/lib/assets";
import type { Project } from "@/lib/types";

async function loadProjects(): Promise<Project[]> {
  const rows = await getDb().project.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      links: { orderBy: { sortOrder: "asc" } },
      tags: { orderBy: { sortOrder: "asc" }, include: { tag: true } },
    },
  });

  return rows.map((row) => {
    const images = row.images.map((img) => ({
      src: assetUrl(`/${img.r2Key.replace(/^\/+/, "")}`),
      alt: img.alt,
      ...(img.caption ? { caption: img.caption } : {}),
    }));
    return {
      id: row.slug,
      title: row.title,
      category: row.category,
      description: row.description,
      // The first image doubles as the cover.
      image: images[0]?.src ?? "",
      images,
      tags: row.tags.map((t) => t.tag.name),
      ...(row.liveUrl ? { liveUrl: row.liveUrl } : {}),
      githubUrl: row.links.map((l) => ({ label: l.label, url: l.url })),
    };
  });
}

/** All projects from MySQL, in display order, shaped for the UI components. */
export const getProjects = unstable_cache(loadProjects, ["projects"], {
  revalidate: CONTENT_REVALIDATE_SECONDS,
  tags: [CONTENT_CACHE_TAG],
});

/** One project by its slug (the `id` the components use). Deduped within a single request. */
export const getProjectBySlug = cache(async (slug: string): Promise<Project | undefined> => {
  const projects = await getProjects();
  return projects.find((project) => project.id === slug);
});
