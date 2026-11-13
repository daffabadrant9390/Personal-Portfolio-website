import { serializeJsonLd } from "@/lib/seo";

/** Structured data for search engines. Renders in the server HTML, no JavaScript needed. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
