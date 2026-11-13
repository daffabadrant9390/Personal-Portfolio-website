import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { AboutGallery } from "@/components/sections/about/AboutGallery";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { ExperienceCard } from "@/components/sections/about/ExperienceCard";
import { SkillGroups } from "@/components/sections/skills/SkillGroups";
import { SoftSkills } from "@/components/sections/skills/SoftSkills";
import { ContactCTASection } from "@/components/sections/landing/ContactCTASection";
import { education, profileFacts } from "@/lib/data/portfolio";
import { getExperiences } from "@/lib/data/experience";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd, pageJsonLd, pageMetadata } from "@/lib/seo";
import type { Experience } from "@/lib/types";

const DESCRIPTION =
  "Full Stack Software Engineer in Jakarta with 4.5+ years across fintech, travel and AI. Full time experience at Kredivo Group and tiket.com, plus contract, part time and community work.";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: DESCRIPTION,
  path: "/about",
});

// Content comes from MySQL, so render per request instead of at build time
// (CI and image builds have no database).
export const dynamic = "force-dynamic";

function GroupHeading({ id, title, note, count }: { id: string; title: string; note: string; count: number }) {
  return (
    <div id={id} className="mb-6 scroll-mt-24">
      <h3 className="font-heading text-2xl font-extrabold tracking-[-0.02em] text-foreground">
        {title} <span className="font-mono text-base font-medium text-muted-foreground">({count})</span>
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-body">{note}</p>
    </div>
  );
}

function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-border" aria-hidden="true" />
      <div className="space-y-4">
        {items.map((exp, i) => (
          <AnimatedSection key={exp.id} delay={i * 0.06} direction="left">
            <div className="relative pl-9 sm:pl-12">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-5 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background ${
                  exp.current ? "border-primary" : "border-border"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${exp.current ? "bg-primary" : "bg-muted-foreground/50"}`} />
              </span>
              <ExperienceCard experience={exp} defaultExpanded={i === 0} />
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const experiences = await getExperiences();
  const fullTime = experiences.filter((e) => e.group === "full-time");
  const nonFullTime = experiences.filter((e) => e.group === "non-full-time");

  return (
    <>
      <JsonLd data={pageJsonLd("ProfilePage", { name: "About M. Daffa Badranthoriq", description: DESCRIPTION, path: "/about" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <AboutHero />

      <AboutGallery />

      {/* Experience, split into full time and everything else */}
      <section id="experience" className="scroll-mt-20 border-t-2 border-border bg-surface py-20 md:py-28">
        <Container>
          <AnimatedSection className="mb-12 max-w-2xl">
            <h2 className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl">
              Experience
            </h2>
            <p className="mt-3 text-body">
              Two lists on purpose. The first is my full time career. The second is contract,
              part time and community work that I do alongside it.
            </p>
          </AnimatedSection>

          <GroupHeading
            id="full-time"
            title="Full time"
            note="Employed roles, newest first."
            count={fullTime.length}
          />
          <Timeline items={fullTime} />

          <div className="mt-16">
            <GroupHeading
              id="non-full-time"
              title="Contract, part time and community"
              note="Project based and volunteer work, newest start first. Some of it is ongoing."
              count={nonFullTime.length}
            />
            <Timeline items={nonFullTime} />
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section id="skills" className="scroll-mt-20 border-t-2 border-border bg-background py-20 md:py-28">
        <Container>
          <AnimatedSection className="mb-10 max-w-2xl">
            <h2 className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl">
              Skills
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <h3 className="mb-5 font-heading text-xl font-bold text-foreground">Hard skills</h3>
            <SkillGroups />
          </AnimatedSection>

          <AnimatedSection className="mt-16">
            <h3 className="mb-5 font-heading text-xl font-bold text-foreground">Soft skills</h3>
            <SoftSkills />
          </AnimatedSection>
        </Container>
      </section>

      {/* Education and languages */}
      <section className="border-t-2 border-border bg-surface py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <AnimatedSection>
              <h2 className="font-heading text-2xl font-extrabold tracking-[-0.02em] text-foreground">Education</h2>
              {education.map((e) => (
                <div key={e.school} className="mt-4">
                  <p className="font-semibold text-foreground">{e.school}</p>
                  <p className="text-body">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {e.period}
                    {e.note ? `, ${e.note}` : ""}
                  </p>
                </div>
              ))}
            </AnimatedSection>
            <AnimatedSection delay={0.06}>
              <h2 className="font-heading text-2xl font-extrabold tracking-[-0.02em] text-foreground">Languages</h2>
              <p className="mt-4 text-body">{profileFacts.languages}</p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <ContactCTASection />
    </>
  );
}
