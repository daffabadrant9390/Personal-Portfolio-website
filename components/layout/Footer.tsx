"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/shared/BrandIcons";
import { Container } from "@/components/shared/Container";

const quickLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

const socials = [
  { Icon: GithubIcon,    href: "https://github.com/daffabadrant9390",                  label: "GitHub" },
  { Icon: LinkedinIcon,  href: "https://www.linkedin.com/in/m-daffa-badran-thoriq/",    label: "LinkedIn" },
  { Icon: InstagramIcon, href: "https://www.instagram.com/daffabadrant/",               label: "Instagram" },
  { Icon: Mail,          href: "mailto:daffabadrant@gmail.com",                         label: "Email" },
];

export function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = resolvedTheme ?? theme;
  const [mounted, setMounted] = useState(false);
  const year = new Date().getFullYear();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  return (
    <footer className="border-t-2 border-border bg-surface">
      <Container className="relative z-10 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr]">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              {mounted ? (
                <Image
                  src={activeTheme === "dark" ? "/logo-dark.webp" : "/logo-light.webp"}
                  alt="DAFFA logo"
                  width={629}
                  height={640}
                  sizes="64px"
                  className="object-contain h-14 w-auto md:h-16"
                />
              ) : (
                <span className="font-heading font-extrabold text-xl tracking-widest uppercase
                                 text-foreground">
                  DAFFA
                </span>
              )}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xs">
              Full Stack Software Engineer in Jakarta, building with Next.js,
              TypeScript and Golang, and teaching what I learn along the way.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl
                             border-2 border-border text-muted-foreground
                             hover:text-foreground hover:border-primary hover:bg-card
                             transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground mb-4">
              Quick Links
            </p>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground mb-4">
              Say hello
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:daffabadrant@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  daffabadrant@gmail.com
                </a>
              </li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-10 border-t-2 border-border pt-6
                        flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year} M. Daffa Badranthoriq. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made in Jakarta with Next.js and Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}
