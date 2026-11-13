import type { MetadataRoute } from "next";
import { getContentDates, getProjectDates } from "@/lib/data/lastModified";
import { absoluteUrl, getSiteUrl, isIndexable, projectPath } from "@/lib/seo";

// lastmod comes from the database, which CI and image builds do not have.
export const dynamic = "force-dynamic";

const latest = (...dates: (Date | undefined)[]) =>
  dates.filter((d): d is Date => Boolean(d)).sort((a, b) => b.getTime() - a.getTime())[0];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  // Staging and previews must not advertise their pages.
  if (!isIndexable(siteUrl)) return [];

  const [{ projects, experience }, projectPages] = await Promise.all([getContentDates(), getProjectDates()]);

  return [
    { path: "/", lastModified: latest(projects, experience), priority: 1 },
    { path: "/about", lastModified: experience, priority: 0.8 },
    { path: "/projects", lastModified: projects, priority: 0.8 },
    // One entry per project page, each with its own last change date.
    ...projectPages.map(({ slug, updatedAt }) => ({ path: projectPath(slug), lastModified: updatedAt, priority: 0.7 })),
    { path: "/contact", lastModified: undefined, priority: 0.5 },
  ].map(({ path, lastModified, priority }) => ({
    url: absoluteUrl(path, siteUrl),
    ...(lastModified ? { lastModified } : {}),
    priority,
  }));
}
