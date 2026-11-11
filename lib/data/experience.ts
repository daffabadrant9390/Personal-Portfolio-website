import "server-only";
import { unstable_cache } from "next/cache";
import { getDb } from "@/lib/db";
import { CONTENT_CACHE_TAG, CONTENT_REVALIDATE_SECONDS } from "@/lib/data/cache";
import { formatPeriod } from "@/lib/data/period";
import type { EmploymentType, Experience, ExperienceGroup } from "@/lib/types";

const GROUP: Record<string, ExperienceGroup> = {
  FULL_TIME: "full-time",
  NON_FULL_TIME: "non-full-time",
};

const EMPLOYMENT: Record<string, EmploymentType> = {
  FULL_TIME: "Full time",
  INTERNSHIP: "Internship",
  CONTRACT: "Contract",
  PART_TIME: "Part time",
  COMMUNITY: "Community",
};

async function loadExperiences(): Promise<Experience[]> {
  const rows = await getDb().experience.findMany({
    orderBy: [{ startDate: "desc" }, { sortOrder: "asc" }],
    include: {
      roles: {
        orderBy: { sortOrder: "asc" },
        include: { highlights: { orderBy: { sortOrder: "asc" } } },
      },
      highlights: { where: { roleId: null }, orderBy: { sortOrder: "asc" } },
      tags: { orderBy: { sortOrder: "asc" }, include: { tag: true } },
    },
  });

  return rows.map((row) => {
    const entry: Experience = {
      id: row.slug,
      role: row.role,
      company: row.company,
      period: formatPeriod(row.startDate, row.endDate, row.isCurrent),
      group: GROUP[row.group],
      employmentType: EMPLOYMENT[row.employmentType],
      description: row.description,
      current: row.isCurrent && row.endDate === null,
      tags: row.tags.map((t) => t.tag.name),
    };
    if (row.location) entry.location = row.location;
    if (row.url) entry.url = row.url;
    if (row.roles.length > 0) {
      entry.roles = row.roles.map((role) => ({
        title: role.title,
        period: formatPeriod(role.startDate, role.endDate, role.isCurrent),
        highlights: role.highlights.map((h) => h.text),
      }));
    } else {
      entry.highlights = row.highlights.map((h) => h.text);
    }
    return entry;
  });
}

/** All experience from MySQL, newest first, shaped for the UI components. */
export const getExperiences = unstable_cache(loadExperiences, ["experience"], {
  revalidate: CONTENT_REVALIDATE_SECONDS,
  tags: [CONTENT_CACHE_TAG],
});
