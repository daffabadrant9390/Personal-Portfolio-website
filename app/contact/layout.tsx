import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to discuss a project, a role, or anything full stack engineering related.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | M. Daffa Badranthoriq",
    description:
      "Get in touch to discuss a project, a role, or anything full stack engineering related.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
