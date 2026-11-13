import { Container } from "@/components/shared/Container";
import { Bone, SkeletonRoot, TextLines } from "@/components/skeletons/Bone";

/**
 * Loading state for a single project page: the screenshot viewer with its
 * caption and thumbnails on the left, the title, description, buttons and
 * tools on the right, and the previous and next project cards below.
 */
export function ProjectDetailSkeleton() {
  return (
    <SkeletonRoot label="Loading project">
      <div aria-hidden="true" className="bg-background pb-20 pt-28 md:pb-28 md:pt-36">
        <Container>
          <Bone className="my-3 h-4 w-28" />

          <div className="mt-2 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
            <div>
              <Bone className="aspect-[16/10] w-full rounded-2xl" />
              <TextLines lines={1} lineClassName="h-4" className="mt-3 max-w-md" />
              <div className="mt-4 flex gap-2 overflow-hidden">
                {Array.from({ length: 6 }, (_, i) => (
                  <Bone key={i} className="aspect-[16/10] w-24 shrink-0 rounded-lg" />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Bone className="h-5 w-20 rounded-full" />
              <div className="space-y-3">
                <Bone className="h-9 w-full sm:h-10" />
                <Bone className="h-9 w-2/3 sm:h-10" />
              </div>
              <TextLines lines={6} />
              <div className="flex flex-wrap gap-3">
                <Bone className="h-11 w-40 rounded-xl" />
                <Bone className="h-11 w-32 rounded-xl" />
              </div>
              <div className="space-y-2.5">
                <Bone className="h-3 w-20" />
                <div className="flex flex-wrap gap-1.5">
                  {["w-20", "w-24", "w-16", "w-28", "w-20", "w-24", "w-16"].map((w, i) => (
                    <Bone key={i} className={`h-7 rounded-md ${w}`} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t-2 border-border pt-4">
                <Bone className="h-9 w-24" />
                <Bone className="h-9 w-16" />
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-3">
                <Bone className="aspect-[16/10] w-24 shrink-0 rounded-lg sm:w-28" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Bone className="h-3 w-28" />
                  <Bone className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </SkeletonRoot>
  );
}
