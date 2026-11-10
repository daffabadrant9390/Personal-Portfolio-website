import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { experiences } from "@/lib/data/portfolio";
import type { Experience } from "@/lib/types";

function HighlightCard({ exp, muted = false }: { exp: Experience; muted?: boolean }) {
  return (
    <div
      className={`rounded-2xl border-2 border-border bg-card p-5 transition-colors ${
        muted ? "pointer-events-none select-none" : "hover:border-primary/50"
      }`}
    >
      <div className="flex w-full flex-row justify-between gap-2">
        <div className="flex flex-col items-start gap-1">
          <span className="font-heading text-sm font-semibold text-foreground">{exp.role}</span>
          <p className="mb-2 text-xs font-medium text-primary">
            {exp.company}
            <span className="font-normal text-muted-foreground"> · {exp.employmentType}</span>
          </p>
        </div>
        <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">{exp.period}</span>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
    </div>
  );
}

export function AboutPreviewSection() {
  const visible = ["kredivo", "tiket"]
    .map((id) => experiences.find((e) => e.id === id))
    .filter((e): e is Experience => Boolean(e));
  const faded = experiences.find((e) => e.id === "pergi-ceria");

  return (
    <section id="about-preview" className="relative border-t-2 border-border bg-background py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <AnimatedSection delay={0.06}>
              <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-[-0.03em] text-foreground md:text-4xl">
                I like owning a feature from the first PRD to the last deploy.
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <p className="mt-5 leading-relaxed text-body">
                I&apos;m a Full Stack Software Engineer with 4.5+ years across fintech, travel
                and AI. I move between frontend performance, Golang services and event driven
                systems, and I built a Claude powered trading extension that is on the Chrome
                Web Store.
              </p>
              <p className="mt-4 leading-relaxed text-body">
                I have led teams of 3 and mentored 200+ bootcamp students, so I care as much
                about clear specs, reviews and teaching as I do about code.
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
              >
                See Full Profile
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
          </div>

          {/* Right: experience highlights */}
          <div>
            <AnimatedSection delay={0.08}>
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Experience Highlights
              </p>
            </AnimatedSection>

            <div className="space-y-3">
              {visible.map((exp, i) => (
                <AnimatedSection key={exp.id} delay={0.1 + i * 0.07} direction="left">
                  <HighlightCard exp={exp} />
                </AnimatedSection>
              ))}

              {faded && (
                <AnimatedSection delay={0.24} direction="left">
                  <div className="relative">
                    <HighlightCard exp={faded} muted />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 rounded-b-2xl bg-linear-to-t from-background to-transparent" />
                  </div>
                </AnimatedSection>
              )}
            </div>

            <div className="mt-5 flex justify-center">
              <Link
                href="/about#experience"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                See All Experience
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
