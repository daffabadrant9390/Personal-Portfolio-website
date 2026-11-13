import { describe, expect, it } from "vitest";
import {
  PRODUCTION_URL,
  absoluteUrl,
  breadcrumbJsonLd,
  getSiteUrl,
  isIndexable,
  pageJsonLd,
  pageMetadata,
  personJsonLd,
  projectJsonLd,
  projectPath,
  projectsItemListJsonLd,
  serializeJsonLd,
  truncateText,
  websiteJsonLd,
} from "./seo";

describe("getSiteUrl", () => {
  it("falls back to production when empty or invalid", () => {
    expect(getSiteUrl("")).toBe(PRODUCTION_URL);
    expect(getSiteUrl(undefined)).toBe(PRODUCTION_URL);
    expect(getSiteUrl("not a url")).toBe(PRODUCTION_URL);
  });

  it("returns the origin without a trailing slash or path", () => {
    expect(getSiteUrl("https://staging.daffabadranthoriq.com/")).toBe("https://staging.daffabadranthoriq.com");
    expect(getSiteUrl(" https://example.com/some/path ")).toBe("https://example.com");
  });
});

describe("isIndexable", () => {
  it("allows only the production host, with or without www", () => {
    expect(isIndexable(PRODUCTION_URL)).toBe(true);
    expect(isIndexable("https://www.daffabadranthoriq.com")).toBe(true);
  });

  it("blocks staging, previews and localhost", () => {
    expect(isIndexable("https://staging.daffabadranthoriq.com")).toBe(false);
    expect(isIndexable("https://my-app.vercel.app")).toBe(false);
    expect(isIndexable("http://localhost:3000")).toBe(false);
  });
});

describe("absoluteUrl", () => {
  it("builds clean URLs for the root and inner pages", () => {
    expect(absoluteUrl("/", PRODUCTION_URL)).toBe(PRODUCTION_URL);
    expect(absoluteUrl("/about", PRODUCTION_URL)).toBe(`${PRODUCTION_URL}/about`);
    expect(absoluteUrl("about", PRODUCTION_URL)).toBe(`${PRODUCTION_URL}/about`);
  });
});

describe("pageMetadata", () => {
  const meta = pageMetadata({ title: "About", description: "desc", path: "/about" });

  it("sets the canonical path, title and description", () => {
    expect(meta.title).toBe("About");
    expect(meta.description).toBe("desc");
    expect(meta.alternates?.canonical).toBe("/about");
  });

  it("fills Open Graph and Twitter completely so the share image is not lost", () => {
    expect(meta.openGraph).toMatchObject({
      type: "website",
      url: "/about",
      siteName: "M. Daffa Badranthoriq",
      title: "About | M. Daffa Badranthoriq",
    });
    expect(meta.openGraph?.images).toHaveLength(1);
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", images: ["/opengraph-image"] });
  });
});

describe("structured data", () => {
  it("links the person, website and pages together by @id", () => {
    const person = personJsonLd(PRODUCTION_URL);
    const site = websiteJsonLd(PRODUCTION_URL);
    expect(person["@id"]).toBe(`${PRODUCTION_URL}/#person`);
    expect(site.publisher).toEqual({ "@id": person["@id"] });

    const profile = pageJsonLd("ProfilePage", { name: "n", description: "d", path: "/about" }, PRODUCTION_URL);
    expect(profile).toMatchObject({ "@type": "ProfilePage", url: `${PRODUCTION_URL}/about`, mainEntity: { "@id": person["@id"] } });
    expect(profile.isPartOf).toEqual({ "@id": site["@id"] });

    const collection = pageJsonLd("CollectionPage", { name: "n", description: "d", path: "/projects" }, PRODUCTION_URL);
    expect(collection).toMatchObject({ about: { "@id": person["@id"] } });
    expect(collection).not.toHaveProperty("mainEntity");

    expect(pageJsonLd("ContactPage", { name: "n", description: "d", path: "/contact" }, PRODUCTION_URL)).not.toHaveProperty("mainEntity");
  });

  it("starts every breadcrumb at Home with 1 based positions", () => {
    const crumbs = breadcrumbJsonLd([{ name: "Projects", path: "/projects" }], PRODUCTION_URL);
    expect(crumbs.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: PRODUCTION_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${PRODUCTION_URL}/projects` },
    ]);
  });

  it("lists projects with absolute image URLs, trimmed descriptions and a fallback url", () => {
    const list = projectsItemListJsonLd(
      [
        { id: "a", title: "A", description: "x".repeat(400), image: "/portfolio-projects/a.jpg", tags: ["Next.js", "Go"], liveUrl: "https://a.example.com" },
        { id: "b", title: "B", description: "short", image: "https://assets.example.com/b.jpg", tags: [] },
        { id: "c", title: "C", description: "no image", image: "", tags: ["React"] },
      ],
      PRODUCTION_URL
    );
    const [a, b, c] = list.itemListElement.map((e) => e.item);
    expect(list.itemListElement.map((e) => e.position)).toEqual([1, 2, 3]);
    expect(a.url).toBe(`${PRODUCTION_URL}/projects/a`);
    expect(a.image).toBe(`${PRODUCTION_URL}/portfolio-projects/a.jpg`);
    expect(a.description.length).toBeLessThanOrEqual(280);
    expect(a.keywords).toBe("Next.js, Go");
    expect(b.url).toBe(`${PRODUCTION_URL}/projects/b`);
    expect(b.image).toBe("https://assets.example.com/b.jpg");
    expect(c).not.toHaveProperty("image");
  });

  it("describes one project with its own address, every screenshot and its links", () => {
    const ld = projectJsonLd(
      {
        id: "tiket",
        title: "tiket.com",
        category: "Frontend",
        description: "Rebuilt pages.",
        image: "/cover.jpg",
        images: [
          { src: "/a.jpg", alt: "Home", caption: "Home page" },
          { src: "https://assets.example.com/b.jpg", alt: "Search" },
        ],
        tags: ["Next.js", "Go"],
        liveUrl: "https://www.tiket.com",
        githubUrl: [{ label: "FE", url: "https://github.com/x/fe" }],
      },
      PRODUCTION_URL
    );
    expect(ld).toMatchObject({
      "@type": "CreativeWork",
      "@id": `${PRODUCTION_URL}/projects/tiket#project`,
      url: `${PRODUCTION_URL}/projects/tiket`,
      name: "tiket.com",
      genre: "Frontend",
      keywords: "Next.js, Go",
      author: { "@id": `${PRODUCTION_URL}/#person` },
      isPartOf: { "@id": `${PRODUCTION_URL}/projects#page` },
      sameAs: ["https://www.tiket.com", "https://github.com/x/fe"],
    });
    expect(ld.image).toEqual([
      { "@type": "ImageObject", contentUrl: `${PRODUCTION_URL}/a.jpg`, caption: "Home page", description: "Home" },
      { "@type": "ImageObject", contentUrl: "https://assets.example.com/b.jpg", caption: "Search", description: "Search" },
    ]);
  });

  it("falls back to the cover image and leaves out empty fields", () => {
    const ld = projectJsonLd({ id: "x", title: "X", description: "d", image: "/c.jpg", tags: [] }, PRODUCTION_URL);
    expect(ld.image).toHaveLength(1);
    expect(ld).not.toHaveProperty("sameAs");
    expect(ld).not.toHaveProperty("genre");

    const bare = projectJsonLd({ id: "y", title: "Y", description: "d", image: "", tags: [] }, PRODUCTION_URL);
    expect(bare).not.toHaveProperty("image");
  });

  it("escapes < so a value cannot close the script tag", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });
});

describe("truncateText", () => {
  it("keeps short text as it is and collapses whitespace", () => {
    expect(truncateText("  a   short\n text ")).toBe("a short text");
  });

  it("cuts long text at a word boundary and adds three dots", () => {
    const out = truncateText("word ".repeat(60), 50);
    expect(out.length).toBeLessThanOrEqual(50);
    expect(out.endsWith("...")).toBe(true);
    expect(out).not.toMatch(/wo\.\.\.$/);
  });

  it("falls back to a hard cut when there is no good space", () => {
    const out = truncateText("x".repeat(300), 50);
    expect(out).toBe(`${"x".repeat(47)}...`);
  });

  it("does not leave a dangling comma or full stop before the dots", () => {
    expect(truncateText("alpha beta gamma, delta", 22)).toBe("alpha beta gamma...");
  });
});

describe("projectPath and page metadata options", () => {
  it("builds the project address from the slug", () => {
    expect(projectPath("tiket-com")).toBe("/projects/tiket-com");
  });

  it("uses the project's own share image and keywords when given", () => {
    const meta = pageMetadata({
      title: "tiket.com",
      description: "d",
      path: "/projects/tiket-com",
      image: { url: "https://assets.example.com/cover.jpg", alt: "Home page" },
      keywords: ["Next.js"],
    });
    expect(meta.keywords).toEqual(["Next.js"]);
    expect(meta.openGraph?.images).toEqual([{ url: "https://assets.example.com/cover.jpg", alt: "Home page" }]);
    expect(meta.twitter).toMatchObject({ images: ["https://assets.example.com/cover.jpg"] });
  });
});
