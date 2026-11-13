import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd, pageJsonLd, pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Get in touch to discuss a project, a role, or anything full stack engineering related.";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: DESCRIPTION,
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={pageJsonLd("ContactPage", { name: "Contact M. Daffa Badranthoriq", description: DESCRIPTION, path: "/contact" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      {children}
    </>
  );
}
