import "dotenv/config";
import { createPrismaClient } from "../lib/prisma-client";
import { parsePeriod } from "../lib/data/period";
import { experiences, projects } from "./seed-data";
import type { Prisma } from "../generated/prisma/client";

/**
 * Loads projects and experience into MySQL. Safe to run again: rows are matched
 * by slug, and their child rows (images, links, roles, bullets, tags) are
 * replaced so the database always mirrors prisma/seed-data.ts.
 *
 *   pnpm db:seed
 */

const db = createPrismaClient();

const GROUP = { "full-time": "FULL_TIME", "non-full-time": "NON_FULL_TIME" } as const;
const EMPLOYMENT = {
  "Full time": "FULL_TIME",
  Internship: "INTERNSHIP",
  Contract: "CONTRACT",
  "Part time": "PART_TIME",
  Community: "COMMUNITY",
} as const;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Tx = Prisma.TransactionClient;

/** Returns tag ids for the names, creating missing tags. Order is preserved. */
async function tagIds(tx: Tx, names: string[]): Promise<number[]> {
  const ids: number[] = [];
  for (const name of names) {
    const tag = await tx.tag.upsert({ where: { name }, update: {}, create: { name } });
    ids.push(tag.id);
  }
  return ids;
}

async function seedProject(project: (typeof projects)[number], sortOrder: number) {
  const slug = slugify(project.title);
  const images = project.images ?? [{ src: project.image, alt: project.title }];
  const data = {
    title: project.title,
    category: project.category,
    description: project.description,
    liveUrl: project.liveUrl ?? null,
    sortOrder,
  };

  await db.$transaction(async (tx) => {
    const row = await tx.project.upsert({ where: { slug }, update: data, create: { slug, ...data } });
    await tx.projectImage.deleteMany({ where: { projectId: row.id } });
    await tx.projectLink.deleteMany({ where: { projectId: row.id } });
    await tx.projectTag.deleteMany({ where: { projectId: row.id } });

    await tx.projectImage.createMany({
      data: images.map((img, i) => ({
        projectId: row.id,
        r2Key: img.src.replace(/^\/+/, ""),
        alt: img.alt,
        caption: "caption" in img ? (img.caption ?? null) : null,
        sortOrder: i,
      })),
    });
    await tx.projectLink.createMany({
      data: (project.githubUrl ?? []).map((link, i) => ({
        projectId: row.id,
        label: link.label,
        url: link.url,
        sortOrder: i,
      })),
    });
    const ids = await tagIds(tx, project.tags);
    await tx.projectTag.createMany({
      data: ids.map((tagId, i) => ({ projectId: row.id, tagId, sortOrder: i })),
    });
  });
}

async function seedExperience(exp: (typeof experiences)[number], sortOrder: number) {
  const period = parsePeriod(exp.period);
  const data = {
    role: exp.role,
    company: exp.company,
    startDate: period.startDate,
    endDate: period.endDate,
    isCurrent: Boolean(exp.current),
    group: GROUP[exp.group],
    employmentType: EMPLOYMENT[exp.employmentType],
    location: exp.location ?? null,
    description: exp.description,
    url: exp.url ?? null,
    sortOrder,
  };

  await db.$transaction(async (tx) => {
    const row = await tx.experience.upsert({
      where: { slug: exp.id },
      update: data,
      create: { slug: exp.id, ...data },
    });
    // Highlights first: they reference roles.
    await tx.experienceHighlight.deleteMany({ where: { experienceId: row.id } });
    await tx.experienceRole.deleteMany({ where: { experienceId: row.id } });
    await tx.experienceTag.deleteMany({ where: { experienceId: row.id } });

    if (exp.roles && exp.roles.length > 0) {
      for (const [i, role] of exp.roles.entries()) {
        const p = parsePeriod(role.period);
        const created = await tx.experienceRole.create({
          data: {
            experienceId: row.id,
            title: role.title,
            startDate: p.startDate,
            endDate: p.endDate,
            isCurrent: p.isCurrent,
            sortOrder: i,
          },
        });
        await tx.experienceHighlight.createMany({
          data: role.highlights.map((text, j) => ({
            experienceId: row.id,
            roleId: created.id,
            text,
            sortOrder: j,
          })),
        });
      }
    } else {
      await tx.experienceHighlight.createMany({
        data: (exp.highlights ?? []).map((text, j) => ({
          experienceId: row.id,
          text,
          sortOrder: j,
        })),
      });
    }

    const ids = await tagIds(tx, exp.tags ?? []);
    await tx.experienceTag.createMany({
      data: ids.map((tagId, i) => ({ experienceId: row.id, tagId, sortOrder: i })),
    });
  });
}

async function main() {
  for (const [i, project] of projects.entries()) await seedProject(project, i);
  for (const [i, exp] of experiences.entries()) await seedExperience(exp, i);
  console.log(`Seeded ${projects.length} projects and ${experiences.length} experience entries.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
