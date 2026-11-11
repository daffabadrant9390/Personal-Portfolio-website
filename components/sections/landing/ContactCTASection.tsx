import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";

export function ContactCTASection() {
  return (
    <section className="relative overflow-hidden border-t-2 border-border bg-background py-24 md:py-32">

      <Container className="relative z-10">
        <div className="max-w-3xl">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
            Have a role, a project or a question? Say hello.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.07}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-body md:text-lg">
            I am open to collaborations, freelance work and full time roles, in Indonesia and abroad, remote, hybrid or on site. I read every message. Email is fastest, and the contact page works too.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.14}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="mailto:daffabadrant@gmail.com"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              daffabadrant@gmail.com
            </a>
            <Link
              href="/contact"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-foreground/80 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
            >
              Open the contact page
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
