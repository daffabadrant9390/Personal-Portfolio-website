import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexable } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  // Staging and previews: keep crawlers out entirely.
  if (!isIndexable(siteUrl)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
