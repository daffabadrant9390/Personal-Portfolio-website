"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/lib/store/useUIStore";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { Container } from "@/components/shared/Container";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const activeTheme = resolvedTheme ?? theme;
  const { toggleMobileMenu } = useUIStore();
  const { isDesktop } = useBreakpoint();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "border-b-2 border-border bg-background/92 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">

        {/* Logo — both variants render immediately and are swapped with a
            `dark:` CSS class instead of a mount-gated JS src swap. Avoids
            the text→image flash (and the layout shift it caused) that came
            from waiting for `mounted` before rendering the real logo. */}
        <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
          <Image
            src="/logo-light.webp"
            alt="DAFFA logo"
            width={629}
            height={640}
            sizes="56px"
            className="block dark:hidden object-contain h-14 w-auto"
            priority
          />
          <Image
            src="/logo-dark.webp"
            alt="DAFFA logo"
            width={576}
            height={640}
            sizes="56px"
            className="hidden dark:block object-contain h-14 w-auto"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        {isDesktop && (
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-accent"
                    transition={{ type: "spring", damping: 32, stiffness: 320 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle — only render after mount to avoid hydration mismatch */}
          {mounted && (
            <button
              onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="flex h-11 w-11 items-center justify-center rounded-xl
                         text-muted-foreground hover:text-foreground hover:bg-accent
                         transition-colors"
            >
              {activeTheme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}

          {/* Desktop CTA */}
          {isDesktop && (
            <Link
              href="/contact"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground
                         hover:opacity-90 transition-opacity"
            >
              Let&apos;s Talk
            </Link>
          )}

          {/* Mobile hamburger */}
          {!isDesktop && (
            <button
              onClick={toggleMobileMenu}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl
                         text-muted-foreground hover:text-foreground hover:bg-accent
                         transition-colors"
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      </Container>
    </motion.header>
  );
}
