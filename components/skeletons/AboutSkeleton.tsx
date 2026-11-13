import type { CSSProperties } from "react";
import { Container } from "@/components/shared/Container";
import { Bone, SkeletonRoot, TextLines } from "@/components/skeletons/Bone";
import {
  ContactCtaSkeleton,
  SectionHeadingSkeleton,
  SkillGroupsSkeleton,
} from "@/components/skeletons/parts";
import { softSkills } from "@/lib/data/portfolio";

/**
 * Loading state for the About page. It follows the real sections in order:
 * hero (with the photo carousel on large screens), the photo gallery on
 * smaller screens, experience split into full time and the rest, skills,
 * education and languages, and the closing call to action.
 *
 * The experience lists come from the database, so the card counts below are a
 * typical length, not an exact one.
 */

const FULL_TIME_PLACEHOLDERS = 3;
const NON_FULL_TIME_PLACEHOLDERS = 4;

function HeroSkeleton() {
  return (
    <section aria-hidden="true" className="relative overflow-hidden bg-background pt-28 pb-10 md:pt-36 md:pb-14">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <div className="space-y-3">
              <Bone className="h-9 w-full sm:h-12 lg:h-14" />
              <Bone className="h-9 w-11/12 sm:h-12 lg:h-14" />
              <Bone className="h-9 w-2/3 sm:h-12 lg:h-14" />
            </div>
            <div className="mt-6 max-w-xl space-y-4">
              <TextLines lines={3} lineClassName="h-4 md:h-5" />
              <TextLines lines={4} lineClassName="h-4 md:h-5" />
              <TextLines lines={3} lineClassName="h-4 md:h-5" />
            </div>
            <Bone className="mt-6 h-[4.25rem] max-w-xl rounded-xl" />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Bone className="h-11 w-44 rounded-xl" />
              <Bone className="h-11 w-36 rounded-xl" />
              <Bone className="h-4 w-32" />
            </div>
          </div>

          {/* Photo carousel, large screens only */}
          <div className="hidden lg:block">
            <Bone className="aspect-[4/5] w-full rounded-[1.25rem]" />
            <div className="mt-5 flex items-center gap-2">
              <Bone className="h-8 w-8 rounded-full" />
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 6 }, (_, i) => (
                  <Bone key={i} className={`h-2.5 rounded-full ${i === 0 ? "w-6" : "w-2.5"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Phones and tablets: the swipeable gallery that replaces the hero carousel. */
function GallerySkeleton() {
  return (
    <section aria-hidden="true" className="border-t-2 border-border bg-background py-10 md:py-14 lg:hidden">
      <Container>
        <Bone className="mb-6 h-8 w-64" />
        <div
          style={{ "--gap": "1rem" } as CSSProperties}
          className="flex gap-[var(--gap)] overflow-hidden [--v:1.15] sm:[--v:2.15]"
        >
          {Array.from({ length: 3 }, (_, i) => (
            <Bone
              key={i}
              className="aspect-[4/5] w-[calc((100%-var(--gap)*(var(--v)-1))/var(--v))] flex-none rounded-[1.25rem]"
            />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Bone key={i} className={`h-2.5 rounded-full ${i === 0 ? "w-6" : "w-2.5"}`} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ExperienceCardSkeleton() {
  return (
    <div className="relative pl-9 sm:pl-12">
      <Bone className="absolute left-0 top-5 h-6 w-6 rounded-full" />
      <div className="rounded-2xl border-2 border-border bg-card px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-2.5">
            <Bone className="h-5 w-3/4 max-w-sm" />
            <div className="flex flex-wrap items-center gap-2">
              <Bone className="h-3.5 w-28" />
              <Bone className="h-3.5 w-36" />
              <Bone className="h-5 w-16 rounded-full" />
            </div>
          </div>
          <Bone className="h-5 w-5 shrink-0 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function Timeline({ count }: { count: number }) {
  return (
    <div className="relative">
      <div className="absolute bottom-3 left-[11px] top-3 w-0.5 bg-border" aria-hidden="true" />
      <div className="space-y-4">
        {Array.from({ length: count }, (_, i) => (
          <ExperienceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function GroupHeadingSkeleton({ noteWidth }: { noteWidth: string }) {
  return (
    <div className="mb-6">
      <Bone className="h-7 w-56" />
      <Bone className={`mt-3 h-4 ${noteWidth}`} />
    </div>
  );
}

function ExperienceSkeleton() {
  return (
    <section aria-hidden="true" className="border-t-2 border-border bg-surface py-20 md:py-28">
      <Container>
        <div className="mb-12">
          <SectionHeadingSkeleton introLines={2} />
        </div>
        <GroupHeadingSkeleton noteWidth="w-56" />
        <Timeline count={FULL_TIME_PLACEHOLDERS} />
        <div className="mt-16">
          <GroupHeadingSkeleton noteWidth="w-96 max-w-full" />
          <Timeline count={NON_FULL_TIME_PLACEHOLDERS} />
        </div>
      </Container>
    </section>
  );
}

function SkillsSkeleton() {
  return (
    <section aria-hidden="true" className="border-t-2 border-border bg-background py-20 md:py-28">
      <Container>
        <div className="mb-10">
          <SectionHeadingSkeleton introLines={0} />
        </div>
        <Bone className="mb-5 h-6 w-32" />
        <SkillGroupsSkeleton />
        <Bone className="mb-5 mt-16 h-6 w-32" />
        <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
          {softSkills.map((skill) => (
            <li key={skill.title} className="border-t-2 border-border py-5">
              <Bone className="h-5 w-48" />
              <TextLines lines={2} lineClassName="h-3.5" className="mt-3" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function EducationSkeleton() {
  return (
    <section aria-hidden="true" className="border-t-2 border-border bg-surface py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <Bone className="h-7 w-40" />
            <div className="mt-4 space-y-2.5">
              <Bone className="h-5 w-64 max-w-full" />
              <Bone className="h-4 w-72 max-w-full" />
              <Bone className="h-3.5 w-40" />
            </div>
          </div>
          <div>
            <Bone className="h-7 w-40" />
            <Bone className="mt-4 h-4 w-72 max-w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function AboutSkeleton() {
  return (
    <SkeletonRoot label="Loading about page">
      <HeroSkeleton />
      <GallerySkeleton />
      <ExperienceSkeleton />
      <SkillsSkeleton />
      <EducationSkeleton />
      <ContactCtaSkeleton />
    </SkeletonRoot>
  );
}
