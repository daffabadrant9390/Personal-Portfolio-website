"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useUIStore } from "@/lib/store/useUIStore";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

export function MobileMenu() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = resolvedTheme ?? theme;
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setMobileMenuOpen(false); }, [pathname, setMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-foreground/40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col
                       bg-background border-l-2 border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4
                            border-b-2 border-border">
              {mounted ? (
                <Image
                  src={activeTheme === "dark" ? "/logo-dark.webp" : "/logo-light.webp"}
                  alt="DAFFA logo"
                  width={629}
                  height={640}
                  sizes="64px"
                  className="object-contain h-14 w-auto"
                  priority
                />
              ) : (
                <span className="font-heading font-extrabold text-lg text-foreground">
                  DAFFA
                </span>
              )}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground
                           hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 p-4 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.05, duration: 0.25, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all ${
                      pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "text-body hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <span className="text-xs text-muted-foreground font-mono">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer CTA */}
            <div className="p-6 border-t-2 border-border">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl
                           bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground
                           hover:opacity-90 transition-opacity"
              >
                Let&apos;s Talk
              </Link>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                daffabadrant@gmail.com
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
