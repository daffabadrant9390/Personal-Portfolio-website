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
  const { theme, setTheme } = useTheme();
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
          ? "border-b border-border bg-background/90 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
          {mounted ? (
            <Image
              src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
              alt="DAFFA logo"
              width={100}
              height={40}
              className="object-contain h-10 w-auto"
              priority
            />
          ) : (
            <span className="font-heading font-bold text-lg tracking-widest uppercase
                             text-slate-900 dark:text-white">
              DAFFA
            </span>
          )}
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
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-slate-900/6 dark:bg-white/8"
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
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg
                         text-slate-500 hover:text-slate-900 hover:bg-slate-900/6
                         dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/8
                         transition-all"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}

          {/* Desktop CTA */}
          {isDesktop && (
            <Link
              href="/contact"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white
                         hover:bg-blue-600 transition-colors shadow-md shadow-blue-700/20"
            >
              Let&apos;s Talk
            </Link>
          )}

          {/* Mobile hamburger */}
          {!isDesktop && (
            <button
              onClick={toggleMobileMenu}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg
                         text-slate-500 hover:text-slate-900 hover:bg-slate-900/6
                         dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/8
                         transition-all"
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      </Container>
    </motion.header>
  );
}
