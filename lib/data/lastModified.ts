import "server-only";
import { getDb } from "@/lib/db";

export interface ContentDates {
  projects?: Date;
  experience?: Date;
}

/**
 * When projects and experience last changed, for the sitemap's lastmod. A real
 * date tells search engines when to recrawl; "now" on every request teaches
 * them to ignore the field. Returns nothing when the database is unreachable
 * so the sitemap still works.
 */
export async function getContentDates(): Promise<ContentDates> {
  try {
    const db = getDb();
    const [projects, experience] = await Promise.all([
      db.project.aggregate({ _max: { updatedAt: true } }),
      db.experience.aggregate({ _max: { updatedAt: true } }),
    ]);
    return {
      projects: projects._max.updatedAt ?? undefined,
      experience: experience._max.updatedAt ?? undefined,
    };
  } catch {
    return {};
  }
}

/** Slug and last change of every project, so each project page appears in the sitemap with a real date. */
export async function getProjectDates(): Promise<{ slug: string; updatedAt: Date }[]> {
  try {
    const rows = await getDb().project.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });
    return rows;
  } catch {
    return [];
  }
}
