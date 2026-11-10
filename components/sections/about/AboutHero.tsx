import Link from "next/link";
import { ArrowRight, Download, Handshake, MapPin } from "lucide-react";
import { AboutHeroCarousel } from "@/components/sections/about/AboutHeroCarousel";
import { Container } from "@/components/shared/Container";
import { profileFacts, RESUME_HREF } from "@/lib/data/portfolio";

/**
 * About hero. Server component: the headline is the LCP candidate so it uses
 * plain HTML and a CSS animation. On large screens the photos play in a
 * carousel in the right column; on smaller screens they sit in the full width
 * gallery below the hero (AboutGallery).
 */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-10 md:pt-36 md:pb-14">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <h1 className="animate-fade-up-about font-heading text-[2.15rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[3.4rem]">
              Full Stack Software Engineer, product minded, and a mentor on the
              side.
            </h1>

            <div className="animate-fade-up-about mt-6 max-w-xl space-y-4 text-base leading-relaxed text-body md:text-lg">
              <p>
                I&apos;m Daffa. I have spent {profileFacts.yearsExperience}{" "}
                years building for fintech, travel and AI, and I like the whole
                path from a written PRD to a monitored production release.
              </p>
              <p>
                Day to day I work in Next.js, TypeScript and Golang. Lately I
                also build with Claude: a trading chart assistant that shipped
                to the Chrome Web Store, and AI customer conversations for a
                travel booking platform.
              </p>
              <p>
                I have led teams of 3 and mentored{" "}
                {profileFacts.studentsMentored} bootcamp students, which is why
                I write specs and reviews that other people can follow.
              </p>
            </div>

            <p className="animate-fade-up-about mt-6 flex max-w-xl items-start gap-2.5 rounded-xl border-2 border-border bg-card px-4 py-3 text-sm leading-relaxed text-body">
              <Handshake
                size={18}
                className="mt-0.5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>
                Open to collaborations, freelance work and full time roles, in
                Indonesia and abroad. Remote, hybrid or on site all work for me.
              </span>
            </p>

            <div className="animate-fade-up-about mt-8 flex flex-wrap items-center gap-3">
              <a
                href={RESUME_HREF}
                download
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download size={15} />
                Download resume
              </a>
              <Link
                href="/contact"
                className="group inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-foreground/80 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
              >
                Get in touch
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <span className="inline-flex items-center gap-1.5 px-1 text-sm text-muted-foreground">
                <MapPin size={14} aria-hidden="true" />
                Jakarta, Indonesia
              </span>
            </div>
          </div>

          <div className="animate-fade-up-about hidden lg:block">
            <AboutHeroCarousel />
          </div>
        </div>
      </Container>
    </section>
  );
}
