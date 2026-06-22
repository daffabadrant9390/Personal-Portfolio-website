"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Container } from "@/components/shared/Container";

const quickLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy",   href: "#" },
  { label: "Terms of Service", href: "#" },
];

const socials = [
  { Icon: FaGithub,   href: "https://github.com",                  label: "GitHub" },
  { Icon: FaLinkedin, href: "https://linkedin.com",                label: "LinkedIn" },
  { Icon: FaXTwitter, href: "https://x.com",                       label: "X (Twitter)" },
  { Icon: Mail,       href: "mailto:hello@daffabadranthoriq.com",   label: "Email" },
];

export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const year = new Date().getFullYear();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  return (
    <footer className="border-t border-border bg-surface dark:bg-[#050A10]">
      <Container className="py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              {mounted ? (
                <Image
                  src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
                  alt="DAFFA logo"
                  width={110}
                  height={44}
                  className="object-contain h-11 w-auto"
                />
              ) : (
                <span className="font-heading font-bold text-xl tracking-widest uppercase
                                 text-slate-900 dark:text-white">
                  DAFFA
                </span>
              )}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xs">
              Building scalable, responsive, and reliable web solutions. Turning
              ideas into impactful digital experiences.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg
                             border border-border
                             text-muted-foreground hover:text-foreground
                             hover:border-slate-300 dark:hover:border-white/20
                             hover:bg-slate-100 dark:hover:bg-white/5
                             transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
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

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Legal
            </p>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-10 border-t border-border pt-6
                        flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year} M. Daffa Badranthoriq. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}
