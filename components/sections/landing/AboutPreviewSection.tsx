import Link from "next/link";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { experiences } from "@/lib/data/portfolio";

export function AboutPreviewSection() {
  const visible = experiences.slice(0, 2);
  const faded   = experiences[2];

  return (
    <section id="about-preview" className="relative py-24 md:py-32 bg-background">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* ── Left ── */}
          <div>
            <AnimatedSection>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4 block">
                {/* // About Me */}
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.06}>
              <h2 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Building scalable solutions{" "}
                <span className="gradient-text">for complex problems.</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                I&apos;m a Full Stack Engineer with a relentless focus on performance
                and architectural integrity. Bridging the gap between complex backend
                logic and seamless user experiences. I love building products that
                serve real users at scale.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                My approach: architecture above all, clean code as a craft, and
                everything built to last.
              </p>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.18}>
              <div className="mt-8 flex gap-8">
                {[
                  { value: "4+",  label: "Years of exp." },
                  { value: "12+", label: "Projects done" },
                  { value: "3+",  label: "Companies" },
                ].map((s, i) => (
                  <div key={i} className={`${i > 0 ? "pl-8 border-l border-border" : ""}`}>
                    <p className="font-heading text-4xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Quick info pills */}
            <AnimatedSection delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                  <MapPin size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                  <Briefcase size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Full Stack @ Vidato Corp</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Desktop-only (lg+) — CSS gate avoids a client-side breakpoint hook. */}
            <AnimatedSection delay={0.26} className="hidden lg:block">
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold
                          text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300
                          transition-colors"
              >
                See Full Profile
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
          </div>

          {/* ── Right: Experience highlights ── */}
          <div>
            <AnimatedSection delay={0.08}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
                Experience Highlights
              </p>
            </AnimatedSection>

            <div className="relative">
              <div className="space-y-3">
                {/* 2 fully visible cards */}
                {visible.map((exp, i) => (
                  <AnimatedSection key={exp.id} delay={0.1 + i * 0.07} direction="left">
                    <div className="rounded-xl border border-border bg-card p-5
                                    hover:border-blue-200 dark:hover:border-blue-900/40
                                    hover:bg-blue-50/30 dark:hover:bg-blue-950/10
                                    transition-all group">
                        <div className="w-full flex flex-col items-start gap-2">
                            <div className="flex flex-row w-full gap-2 justify-between">
                              <div className="flex flex-col items-start gap-1.5">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className="font-heading text-sm font-semibold text-foreground">
                                    {exp?.role || ''}
                                  </span>
                                </div>
                                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                                  {exp?.company || ''}
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                              {exp?.period || ''}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {exp?.description || ''}
                            </p>
                        </div>
                    </div>
                  </AnimatedSection>
                ))}

                {/* 3rd card — fades out */}
                {faded && (
                  <AnimatedSection delay={0.24} direction="left">
                    <div className="relative">
                      <div className="rounded-xl border border-border bg-card p-5
                                      pointer-events-none select-none">
                        <div className="w-full flex flex-col items-start gap-2">
                            <div className="flex flex-row w-full gap-2 justify-between">
                              <div className="flex flex-col items-start gap-1.5">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className="font-heading text-sm font-semibold text-foreground">
                                    {faded?.role || ''}
                                  </span>
                                </div>
                                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                                  {faded?.company || ''}
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                              {faded?.period || ''}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {faded?.description || ''}
                            </p>
                        </div>
                      </div>
                      {/* Fade overlay from mid-card to bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-3/4
                                      bg-linear-to-t from-background to-transparent
                                      pointer-events-none rounded-b-xl" />
                    </div>
                  </AnimatedSection>
                )}
              </div>

              {/* See all link */}
              <div className="mt-5 flex justify-center">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-lg border border-border
                             bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground
                             hover:text-foreground hover:border-blue-300 dark:hover:border-blue-800
                             hover:bg-blue-50 dark:hover:bg-blue-950/20
                             transition-all"
                >
                  See All Experience
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* <AnimatedSection delay={0.32}>
              <div className="mt-4 text-right">
                <Link
                  href="/about"
                  className="text-xs uppercase tracking-widest text-muted-foreground
                             hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Full Profile →
                </Link>
              </div>
            </AnimatedSection> */}
          </div>
        </div>
      </Container>
    </section>
  );
}
