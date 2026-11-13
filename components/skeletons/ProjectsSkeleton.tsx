import { Container } from "@/components/shared/Container";
import { Bone, SkeletonRoot, TextLines } from "@/components/skeletons/Bone";

/**
 * Loading state for the Projects page: heading, the search and sort row, the
 * category chips and a grid of project cards.
 */
export function ProjectsSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <SkeletonRoot label="Loading projects">
      <section aria-hidden="true" className="relative bg-background pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="space-y-3">
            <Bone className="h-9 w-full max-w-xl sm:h-11 lg:h-12" />
            <Bone className="h-9 w-2/3 max-w-md sm:h-11 lg:h-12" />
          </div>
          <TextLines lines={2} className="mt-5 max-w-lg" lineClassName="h-4 md:h-5" />
        </Container>
      </section>

      <section aria-hidden="true" className="bg-background pb-24">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-3">
              <Bone className="h-[42px] flex-1 rounded-xl" />
              <Bone className="size-[42px] shrink-0 rounded-xl md:h-[42px] md:w-48" />
            </div>
            <div className="flex gap-2">
              {["w-12", "w-24", "w-24"].map((w, i) => (
                <Bone key={i} className={`h-8 rounded-full ${w}`} />
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: cards }, (_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border-2 border-border bg-card">
                <Bone className="h-44 rounded-none" />
                <div className="space-y-3 p-5">
                  <Bone className="h-5 w-2/3" />
                  <TextLines lines={3} lineClassName="h-3.5" />
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Bone className="h-7 w-20 rounded-md" />
                    <Bone className="h-7 w-24 rounded-md" />
                    <Bone className="h-7 w-20 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </SkeletonRoot>
  );
}
