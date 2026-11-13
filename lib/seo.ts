import type { Metadata } from "next";

/**
 * One place for everything the search engines read: the site URL, default
 * copy, per page metadata and structured data (JSON-LD).
 *
 * NEXT_PUBLIC_SITE_URL is inlined at build time, so each environment must be
 * built with its own value (see .env.example). Only the production URL is
 * allowed to be indexed; every other URL (staging, previews) is marked noindex
 * and blocked in robots.txt so it cannot compete with the real site.
 */

export const PRODUCTION_URL = "https://daffabadranthoriq.com";
export const SITE_NAME = "M. Daffa Badranthoriq";
export const SITE_TITLE = "M. Daffa Badranthoriq | Full Stack Software Engineer";
export const SITE_DESCRIPTION =
  "Full Stack Software Engineer in Jakarta building with Next.js, TypeScript and Golang, plus AI and LLM applications. 4.5+ years across fintech, travel and AI.";
export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_TITLE };

/** The base URL of this deployment, without a trailing slash. Falls back to production. */
export function getSiteUrl(raw: string | undefined = process.env.NEXT_PUBLIC_SITE_URL): string {
  const value = (raw ?? "").trim();
  if (!value) return PRODUCTION_URL;
  try {
    return new URL(value).origin;
  } catch {
    return PRODUCTION_URL;
  }
}

/** True only on the production host, the single place that should appear in search results. */
export function isIndexable(siteUrl: string = getSiteUrl()): boolean {
  return new URL(siteUrl).hostname.replace(/^www\./, "") === new URL(PRODUCTION_URL).hostname;
}

export function absoluteUrl(path: string, siteUrl: string = getSiteUrl()): string {
  return `${siteUrl}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;
}

/** The address of a project's own page. */
export const projectPath = (slug: string) => `/projects/${slug}`;

/** Makes a stored image path usable in structured data (R2 URLs are already absolute). */
function absoluteImage(src: string, siteUrl: string): string {
  return /^https?:\/\//.test(src) ? src : absoluteUrl(src, siteUrl);
}

/**
 * Shortens text for a meta description. Search results show roughly the first
 * 155 characters, so cut at a word boundary just before that and add "...".
 */
export function truncateText(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 3);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.-]+$/, "")}...`;
}

/**
 * Metadata for an inner page. Next replaces `openGraph` and `twitter` as a
 * whole when a page sets them, so each one is filled in completely here
 * (type, site name, image) instead of losing what the root layout defined.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  /** Share image for this page. Defaults to the site wide image. */
  image?: { url: string; alt: string };
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const shareImage = image ? { url: image.url, alt: image.alt } : OG_IMAGE;
  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      title: fullTitle,
      description,
      images: [image ? shareImage : OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
}

/* ───────────── structured data (JSON-LD) ───────────── */

const personId = (siteUrl: string) => `${siteUrl}/#person`;
const websiteId = (siteUrl: string) => `${siteUrl}/#website`;

export function personJsonLd(siteUrl: string = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(siteUrl),
    name: SITE_NAME,
    url: siteUrl,
    image: absoluteUrl(OG_IMAGE.url, siteUrl),
    jobTitle: "Full Stack Software Engineer",
    worksFor: { "@type": "Organization", name: "Kredivo Group" },
    description: SITE_DESCRIPTION,
    knowsAbout: ["Next.js", "TypeScript", "Golang", "Node.js", "React", "LLM applications"],
    address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
    sameAs: [
      "https://github.com/daffabadrant9390",
      "https://www.linkedin.com/in/m-daffa-badran-thoriq/",
      "https://www.instagram.com/daffabadrant/",
    ],
  };
}

export function websiteJsonLd(siteUrl: string = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(siteUrl),
    url: siteUrl,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": personId(siteUrl) },
  };
}

export function breadcrumbJsonLd(
  trail: { name: string; path: string }[],
  siteUrl: string = getSiteUrl()
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteUrl),
    })),
  };
}

export function pageJsonLd(
  type: "ProfilePage" | "ContactPage" | "CollectionPage",
  { name, description, path }: { name: string; description: string; path: string },
  siteUrl: string = getSiteUrl()
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path, siteUrl)}#page`,
    url: absoluteUrl(path, siteUrl),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId(siteUrl) },
    ...(type === "ProfilePage" ? { mainEntity: { "@id": personId(siteUrl) } } : {}),
    ...(type === "CollectionPage" ? { about: { "@id": personId(siteUrl) } } : {}),
  };
}

interface ProjectForSeo {
  /** The project's slug. */
  id: string;
  title: string;
  category?: string;
  description: string;
  image: string;
  images?: { src: string; alt: string; caption?: string }[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: { label: string; url: string }[];
}

/** The projects page as a list of the work shown on it. */
export function projectsItemListJsonLd(projects: ProjectForSeo[], siteUrl: string = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by M. Daffa Badranthoriq",
    itemListElement: projects.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description.length > 280 ? `${project.description.slice(0, 277)}...` : project.description,
        url: absoluteUrl(projectPath(project.id), siteUrl),
        ...(project.image ? { image: absoluteImage(project.image, siteUrl) } : {}),
        keywords: project.tags.join(", "),
        author: { "@id": personId(siteUrl) },
      },
    })),
  };
}

/**
 * One project as a creative work: its own address, every screenshot with its
 * caption, the tools used, and links to the live site and source code.
 */
export function projectJsonLd(project: ProjectForSeo, siteUrl: string = getSiteUrl()) {
  const url = absoluteUrl(projectPath(project.id), siteUrl);
  const images = project.images?.length
    ? project.images
    : project.image
      ? [{ src: project.image, alt: project.title }]
      : [];
  const sameAs = [project.liveUrl, ...(project.githubUrl ?? []).map((l) => l.url)].filter(
    (value): value is string => Boolean(value)
  );

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    mainEntityOfPage: url,
    name: project.title,
    description: project.description,
    ...(project.category ? { genre: project.category } : {}),
    keywords: project.tags.join(", "),
    inLanguage: "en",
    author: { "@id": personId(siteUrl) },
    creator: { "@id": personId(siteUrl) },
    isPartOf: { "@id": `${absoluteUrl("/projects", siteUrl)}#page` },
    ...(images.length
      ? {
          image: images.map((img) => ({
            "@type": "ImageObject",
            contentUrl: absoluteImage(img.src, siteUrl),
            caption: img.caption ?? img.alt,
            description: img.alt,
          })),
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** Serializes JSON-LD safely for a <script> tag (a "<" inside a value cannot close the tag). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
