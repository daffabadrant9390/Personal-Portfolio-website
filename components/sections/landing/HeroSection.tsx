"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { Container } from "@/components/shared/Container";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function HeroSection() {
  const { isMobile } = useBreakpoint();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-background">
      <Container className="pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_380px]">

          {/* ── Left: text content ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
            style={{ willChange: "opacity" }}
          >
            {/* "Available" badge */}
            <motion.div variants={item} className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4
                               text-[10px] sm:text-xs font-semibold uppercase tracking-widest
                               border border-emerald-300 dark:border-emerald-600/30
                               bg-emerald-50 dark:bg-emerald-900/20
                               text-emerald-700 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                Available for Work
              </span>
            </motion.div>

            {/* Headline — smaller on mobile */}
            <motion.h1
              variants={item}
              className="font-heading font-bold leading-[1.1] tracking-tight
                         text-slate-900 dark:text-white
                         text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem]"
            >
              Software Engineer
              <br />
              <span className="gradient-text">specializing in</span>
              <br />
              scalable web
              <br />
              infrastructure
            </motion.h1>

            {/* Bio */}
            <motion.p
              variants={item}
              className="mt-4 md:mt-6 max-w-xl text-sm sm:text-base md:text-lg
                         leading-relaxed text-slate-600 dark:text-slate-400"
            >
              Hi, I&apos;m{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                M. Daffa Badranthoriq
              </span>{" "}
              — a Full Stack Engineer focused on building robust, high-performance,
              and scalable solutions at{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-300">
                Vidato Corp
              </span>
              .
            </motion.p>

            {/* CTA buttons — tighter on mobile */}
            <motion.div variants={item} className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-xl
                           bg-blue-700 hover:bg-blue-600
                           px-4 py-2.5 sm:px-6 sm:py-3
                           text-xs sm:text-sm font-semibold text-white
                           shadow-md shadow-blue-700/20 transition-all"
              >
                View My Work
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl
                           px-4 py-2.5 sm:px-6 sm:py-3
                           text-xs sm:text-sm font-semibold transition-all
                           border border-slate-300 dark:border-white/12
                           text-slate-800 dark:text-white
                           hover:border-slate-400 dark:hover:border-white/22
                           hover:bg-slate-100 dark:hover:bg-white/6"
              >
                Contact Me
              </Link>

              <a
                href="#"
                className="inline-flex items-center gap-1.5 rounded-xl
                           px-4 py-2.5 sm:px-6 sm:py-3
                           text-xs sm:text-sm font-medium transition-all
                           border border-slate-200 dark:border-white/10
                           text-slate-600 dark:text-slate-400
                           hover:border-slate-300 dark:hover:border-white/20
                           hover:text-slate-900 dark:hover:text-white"
              >
                <Download size={13} />
                Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4">
              <div className="flex gap-1.5 md:gap-2">
                {[
                  { Icon: FaGithub,   href: "https://github.com",               label: "GitHub" },
                  { Icon: FaLinkedin, href: "https://linkedin.com",             label: "LinkedIn" },
                  { Icon: Mail,       href: "mailto:hello@daffabadranthoriq.com", label: "Email" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg transition-all
                               border border-slate-200 dark:border-white/10
                               text-slate-500 dark:text-slate-400
                               hover:border-slate-400 dark:hover:border-white/22
                               hover:text-slate-900 dark:hover:text-white
                               hover:bg-slate-100 dark:hover:bg-white/6"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
              <div className="h-px flex-1 max-w-10 bg-slate-200 dark:bg-white/10" />
              <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-600 truncate">
                hello@daffabadranthoriq.com
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Profile card (desktop only) ── */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
              className="relative flex justify-center lg:justify-end"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="relative h-[400px] w-[280px]">

                {/* Main card */}
                <div className="relative h-full w-full rounded-2xl overflow-hidden
                                border border-slate-200 dark:border-white/8
                                bg-linear-to-br from-slate-100 to-slate-200
                                dark:from-slate-800 dark:to-slate-900
                                shadow-lg dark:shadow-none">

                  <Image
                    src="/profile-img-2.webp"
                    alt="M. Daffa Badranthoriq"
                    fill
                    className="object-cover object-top"
                    priority
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-5
                                  bg-linear-to-t from-slate-200 dark:from-slate-900
                                  via-slate-100/90 dark:via-slate-900/80 to-transparent">
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-1
                                  text-blue-700 dark:text-blue-400">
                      Full Stack Engineer
                    </p>
                    <p className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                      M. Daffa Badranthoriq
                    </p>
                    <p className="text-xs mt-0.5 text-slate-500">
                      Vidato Corp · Jakarta, Indonesia
                    </p>
                  </div>
                </div>

                {/* Floating stat — Years */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.35, ease: "easeOut" }}
                  className="absolute -left-12 top-16 rounded-xl px-4 py-3
                             border border-slate-200 dark:border-white/8
                             bg-background shadow-md dark:shadow-none"
                  style={{ willChange: "transform, opacity" }}
                >
                  <p className="text-2xl font-bold font-heading text-slate-900 dark:text-white">4+</p>
                  <p className="text-[11px] mt-0.5 text-slate-500 dark:text-slate-400">Years Exp.</p>
                </motion.div>

                {/* Floating stat — Projects */}
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.72, duration: 0.35, ease: "easeOut" }}
                  className="absolute -right-10 bottom-28 rounded-xl px-4 py-3
                             border border-slate-200 dark:border-white/8
                             bg-background shadow-md dark:shadow-none"
                  style={{ willChange: "transform, opacity" }}
                >
                  <p className="text-2xl font-bold font-heading text-slate-900 dark:text-white">12+</p>
                  <p className="text-[11px] mt-0.5 text-slate-500 dark:text-slate-400">Projects</p>
                </motion.div>

                {/* Open to Work pill */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.82, duration: 0.3, ease: "easeOut" }}
                  className="absolute -right-8 top-8 flex items-center gap-2 rounded-full px-3 py-1.5
                             border border-emerald-300 dark:border-emerald-700/30
                             bg-emerald-50 dark:bg-emerald-950/50"
                  style={{ willChange: "transform, opacity" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                    Open to Work
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-7 w-px bg-linear-to-b from-slate-300 dark:from-slate-600 to-transparent"
          />
        </motion.div>
      </Container>
    </section>
  );
}
