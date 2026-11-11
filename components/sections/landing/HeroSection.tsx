import Link from "next/link";
import { ArrowRight, Mail, Download, MapPin, Handshake } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/BrandIcons";
import { Container } from "@/components/shared/Container";
import { ShimmerImage } from "@/components/shared/ShimmerImage";
import { assetUrl } from "@/lib/assets";
import { profileFacts, RESUME_HREF } from "@/lib/data/portfolio";

const FACTS = [
  {
    value: profileFacts.yearsExperience,
    label: "years in fintech, travel and AI",
  },
  {
    value: profileFacts.countriesServed,
    label: "countries on one platform I rebuilt",
  },
  { value: profileFacts.studentsMentored, label: "bootcamp students mentored" },
];

const SOCIALS = [
  {
    Icon: GithubIcon,
    href: "https://github.com/daffabadrant9390",
    label: "GitHub",
  },
  {
    Icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/m-daffa-badran-thoriq/",
    label: "LinkedIn",
  },
  { Icon: Mail, href: "mailto:daffabadrant@gmail.com", label: "Email" },
];

/**
 * Server component on purpose: the headline and photo are the LCP candidates,
 * so they render as plain HTML with CSS entrance animations and no JS wait.
 * Phones get a compact photo header (small portrait next to the availability
 * note) instead of a tall photo block; from lg the photo is the large offset
 * portrait in the right column. It is one <img> either way, restyled by breakpoint.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <Container className="relative z-10 pt-24 pb-14 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* Photo. Compact header on phones, large offset portrait on lg. */}
          <div className="animate-fade-up-about flex items-center gap-4 lg:order-last lg:mx-0 lg:block lg:w-[22rem] lg:justify-self-end">
            <div className="relative w-24 shrink-0 pr-2 pb-2 sm:w-28 lg:w-full lg:pr-4 lg:pb-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-brand lg:translate-x-4 lg:translate-y-4 lg:rounded-[1.25rem]"
              />
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-foreground/10 lg:aspect-[4/5] lg:rounded-[1.25rem]">
                <ShimmerImage
                  src={assetUrl("/assets/home-page-image.jpeg")}
                  alt="Daffa running a road race in a white shirt, throwing rock hand signs toward the camera"
                  fill
                  preload
                  sizes="(max-width: 1023px) 112px, 352px"
                  className="origin-[50%_22%] scale-[1.75] object-cover object-[50%_20%] lg:origin-center lg:scale-100 lg:object-[50%_42%]"
                />
              </div>
            </div>

            {/* Phones only: who and where, next to the portrait */}
            <div className="min-w-0 lg:hidden">
              <p className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-3 py-1 text-xs font-semibold text-body">
                <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
                Open to work and collaboration
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin size={14} aria-hidden="true" />
                Jakarta, Indonesia
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="animate-fade-up-about hidden items-center gap-2 rounded-full border-2 border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-body lg:inline-flex">
              <span
                className="h-2 w-2 rounded-full bg-leaf"
                aria-hidden="true"
              />
              Open to work and collaboration
            </p>

            <h1 className="animate-fade-up-hero font-heading text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-5xl lg:mt-6 lg:text-[3.4rem] lg:leading-[1.08]">
              Full Stack Software Engineer building with{" "}
              <span className="text-primary">
                Next.js, TypeScript and Golang
              </span>
            </h1>

            <p className="animate-fade-up-about mt-5 max-w-xl text-base leading-relaxed text-body md:text-lg lg:mt-6">
              I&apos;m Daffa, based in Jakarta. At Kredivo Group I rebuilt a
              collections platform that now serves four countries and responds
              more than 75% faster. Outside work I build AI products with Claude
              and mentor bootcamp students.
            </p>

            <p className="animate-fade-up-about mt-4 flex max-w-xl items-start gap-2.5 rounded-xl border-2 border-border bg-card px-4 py-3 text-sm leading-relaxed text-body">
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

            <div className="animate-fade-up-about mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
              <Link
                href="/projects"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                See my work
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-foreground/80 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card sm:order-last sm:min-h-11 sm:border-0 sm:px-2 sm:text-primary sm:underline sm:decoration-2 sm:underline-offset-4 sm:hover:bg-transparent sm:hover:opacity-80"
              >
                Get in touch
              </Link>
              <a
                href={RESUME_HREF}
                download
                className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40 sm:col-span-1 sm:border-foreground/80 sm:bg-transparent sm:hover:bg-card"
              >
                <Download size={15} />
                Download resume
              </a>
            </div>

            <div className="animate-fade-up-about mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <span className="hidden items-center gap-1.5 lg:inline-flex">
                <MapPin size={14} aria-hidden="true" />
                Jakarta, Indonesia
              </span>
              <span className="-ml-2.5 flex items-center gap-1 lg:ml-0">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </span>
            </div>
          </div>
        </div>

        {/* Facts. Phones: one card with a row per fact (number left, label right,
            dashed dividers). From sm: a ruled three column row. */}
        <dl className="mt-10 overflow-hidden rounded-2xl border-2 border-border bg-card sm:mt-14 sm:grid sm:grid-cols-3 sm:rounded-none sm:border-0 sm:border-t-2 sm:bg-transparent md:mt-20">
          {FACTS.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex items-center gap-4 px-5 py-4 sm:block sm:px-6 sm:py-6 ${
                i > 0
                  ? "border-t-2 border-dashed border-border sm:border-l-2 sm:border-t-0 sm:border-solid"
                  : "sm:pl-0"
              }`}
            >
              <dt className="w-20 shrink-0 font-heading text-3xl font-extrabold tracking-tight text-primary sm:w-auto sm:text-4xl sm:text-foreground">
                {fact.value}
              </dt>
              <dd className="text-sm leading-snug text-body sm:mt-1 sm:text-muted-foreground">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
