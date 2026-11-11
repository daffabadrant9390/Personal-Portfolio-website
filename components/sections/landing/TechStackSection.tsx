import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { SkillGroups } from "@/components/sections/skills/SkillGroups";
import { softSkills } from "@/lib/data/portfolio";

export function TechStackSection() {
  return (
    <section className="relative border-t-2 border-border bg-background py-20 md:py-28">
      <Container>
        <AnimatedSection className="mb-10 max-w-2xl md:mb-12">
          <h2 className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl">
            What I work with
          </h2>
          <p className="mt-3 text-body">
            The tools on my resume, grouped the way I use them: product screens, services and
            data, cloud and payments, and AI applications.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.06}>
          <SkillGroups />
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-12 border-t-2 border-border pt-8">
          <h3 className="font-heading text-lg font-bold text-foreground">Beyond the code</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {softSkills.map((s) => (
              <li key={s.title} className="rounded-full border-2 border-border bg-card px-4 py-2 text-sm font-medium text-body">
                {s.title}
              </li>
            ))}
          </ul>
          <Link
            href="/about#skills"
            className="group mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline decoration-2 underline-offset-4 hover:opacity-80"
          >
            See where each one showed up
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
