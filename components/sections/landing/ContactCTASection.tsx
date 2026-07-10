import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";

export function ContactCTASection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-background">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      {/* Ambient glow — subtle, both modes */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
                      h-[360px] w-[360px] rounded-full
                      bg-blue-100/60 dark:bg-blue-900/8
                      blur-[100px] pointer-events-none" />
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2
                      h-[240px] w-[240px] rounded-full
                      bg-red-50/40 dark:bg-red-900/6
                      blur-[80px] pointer-events-none" />

      <Container className="relative z-10 max-w-3xl text-center">

        <AnimatedSection>
          <span className="text-xs font-semibold uppercase tracking-widest
                           text-blue-600 dark:text-blue-400 mb-4 block">
            {"// Let's Connect"}
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.07}>
          <h2 className="font-heading font-bold tracking-tight text-foreground leading-[1.1]
                         text-2xl sm:text-4xl md:text-5xl lg:text-[3rem]">
            Have something in mind?
            <br />
            <span className="gradient-text">Let&apos;s talk about it.</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.14}>
          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Whether it&apos;s a project, a collaboration, or just a conversation —
            I&apos;m always up for it. Find everything you need on the contact page.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-xl
                         bg-blue-700 hover:bg-blue-600
                         px-5 py-2.5 sm:px-8 sm:py-3.5
                         text-xs sm:text-sm font-semibold text-white
                         shadow-lg shadow-blue-700/20 transition-all"
            >
              Go to Contact Page
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href="mailto:daffabadrant@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl
                         px-5 py-2.5 sm:px-8 sm:py-3.5
                         text-xs sm:text-sm font-medium transition-all
                         border border-border text-muted-foreground
                         hover:text-foreground hover:border-blue-300 dark:hover:border-blue-800
                         hover:bg-blue-50 dark:hover:bg-blue-950/20"
            >
              Or drop a quick email
            </a>
          </div>
        </AnimatedSection>

      </Container>
    </section>
  );
}
