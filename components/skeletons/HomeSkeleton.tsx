import { Container } from "@/components/shared/Container";
import { Bone, SkeletonRoot, TextLines } from "@/components/skeletons/Bone";
import {
  ContactCtaSkeleton,
  SectionHeadingSkeleton,
  SkillGroupsSkeleton,
} from "@/components/skeletons/parts";
import { softSkills } from "@/lib/data/portfolio";

/**
 * Loading state for the landing page. It follows the real sections in order:
 * hero, about preview with experience highlights, tech stack, featured
 * projects and the contact call to action. Spacing copies the real sections.
 */

function HeroSkeleton() {
  return (
    <section aria-hidden="true" className="relative overflow-hidden bg-background">
      <Container className="relative z-10 pt-24 pb-14 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* Photo: small portrait with the availability note on phones, large portrait from lg */}
          <div className="flex items-center gap-4 lg:order-last lg:block lg:w-[22rem] lg:justify-self-end">
            <Bone className="aspect-square w-24 shrink-0 rounded-2xl sm:w-28 lg:aspect-[4/5] lg:w-full lg:rounded-[1.25rem]" />
            <div className="min-w-0 flex-1 space-y-3 lg:hidden">
              <Bone className="h-7 w-full max-w-[14rem] rounded-full" />
              <Bone className="h-4 w-32" />
            </div>
          </div>

          {/* Copy */}
          <div>
            <Bone className="hidden h-8 w-64 rounded-full lg:block" />
            <div className="space-y-3 lg:mt-6">
              <Bone className="h-8 w-full sm:h-12 lg:h-14" />
              <Bone className="h-8 w-5/6 sm:h-12 lg:h-14" />
              <Bone className="h-8 w-2/3 sm:h-12 lg:h-14" />
            </div>
            <TextLines lines={4} className="mt-5 max-w-xl lg:mt-6" lineClassName="h-4 md:h-5" />
            <Bone className="mt-4 h-[4.25rem] max-w-xl rounded-xl" />
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Bone className="h-11 w-40 rounded-xl" />
              <Bone className="h-11 w-36 rounded-xl" />
              <Bone className="h-11 w-44 rounded-xl" />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Bone className="hidden h-4 w-36 lg:block" />
              <Bone className="h-9 w-9 rounded-xl" />
              <Bone className="h-9 w-9 rounded-xl" />
              <Bone className="h-9 w-9 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Three headline numbers */}
        <div className="mt-10 overflow-hidden rounded-2xl border-2 border-border bg-card sm:mt-14 sm:grid sm:grid-cols-3 sm:rounded-none sm:border-0 sm:border-t-2 sm:bg-transparent md:mt-20">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-5 py-4 sm:block sm:px-6 sm:py-6 ${
                i > 0
                  ? "border-t-2 border-dashed border-border sm:border-l-2 sm:border-t-0 sm:border-solid"
                  : "sm:pl-0"
              }`}
            >
              <Bone className="h-9 w-20 shrink-0 sm:h-10 sm:w-24" />
              <Bone className="h-4 w-full max-w-[14rem] sm:mt-2" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ExperienceHighlightSkeleton({ faded = false }: { faded?: boolean }) {
  return (
    <div className={`rounded-2xl border-2 border-border bg-card p-5 ${faded ? "opacity-50" : ""}`}>
      <div className="flex w-full flex-row justify-between gap-2">
        <div className="flex flex-col items-start gap-2">
          <Bone className="h-4 w-48" />
          <Bone className="h-3 w-40" />
        </div>
        <Bone className="h-3 w-24 shrink-0" />
      </div>
      <TextLines lines={2} lineClassName="h-3" className="mt-3" />
    </div>
  );
}

function AboutPreviewSkeleton() {
  return (
    <section aria-hidden="true" className="relative border-t-2 border-border bg-background py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div className="space-y-3">
              <Bone className="h-9 w-full md:h-10" />
              <Bone className="h-9 w-4/5 md:h-10" />
              <Bone className="h-9 w-1/2 md:h-10" />
            </div>
            <TextLines lines={4} className="mt-5" />
            <TextLines lines={3} className="mt-4" />
            <Bone className="mt-8 h-5 w-40" />
          </div>

          <div>
            <Bone className="mb-5 h-3 w-44" />
            <div className="space-y-3">
              <ExperienceHighlightSkeleton />
              <ExperienceHighlightSkeleton />
              <ExperienceHighlightSkeleton faded />
            </div>
            <div className="mt-5 flex justify-center">
              <Bone className="h-11 w-52 rounded-xl" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TechStackSkeleton() {
  return (
    <section aria-hidden="true" className="relative border-t-2 border-border bg-background py-20 md:py-28">
      <Container>
        <div className="mb-10 md:mb-12">
          <SectionHeadingSkeleton introLines={2} />
        </div>
        <SkillGroupsSkeleton />
        <div className="mt-12 border-t-2 border-border pt-8">
          <Bone className="h-6 w-40" />
          <div className="mt-4 flex flex-wrap gap-2">
            {softSkills.map((skill, i) => (
              <Bone key={skill.title} className={`h-10 rounded-full ${i % 2 ? "w-32" : "w-40"}`} />
            ))}
          </div>
          <Bone className="mt-5 h-5 w-64" />
        </div>
      </Container>
    </section>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="w-[240px] flex-none overflow-hidden rounded-2xl border-2 border-border bg-card sm:w-[280px] md:w-[300px]">
      <Bone className="h-36 rounded-none sm:h-40" />
      <div className="space-y-3 p-4">
        <Bone className="h-5 w-3/4" />
        <TextLines lines={2} lineClassName="h-3" />
        <div className="flex gap-2 pt-1">
          <Bone className="h-6 w-16 rounded-md" />
          <Bone className="h-6 w-20 rounded-md" />
          <Bone className="h-6 w-14 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function FeaturedProjectsSkeleton() {
  const row = (
    <div className="flex w-max gap-4 overflow-hidden px-4 sm:px-6 lg:px-8">
      {Array.from({ length: 6 }, (_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-t-2 border-border bg-background py-20 md:py-32"
    >
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end md:mb-12">
          <div>
            <Bone className="mb-3 h-3 w-24" />
            <Bone className="h-8 w-60 sm:h-9 md:h-10" />
          </div>
          <Bone className="h-5 w-40" />
        </div>
      </Container>
      <div className="space-y-4">
        {row}
        <div className="hidden md:block">{row}</div>
      </div>
    </section>
  );
}

export function HomeSkeleton() {
  return (
    <SkeletonRoot label="Loading home page">
      <HeroSkeleton />
      <AboutPreviewSkeleton />
      <TechStackSkeleton />
      <FeaturedProjectsSkeleton />
      <ContactCtaSkeleton />
    </SkeletonRoot>
  );
}
