import { Container } from "@/components/shared/Container";
import { techCategories } from "@/lib/data/portfolio";
import { Bone, TextLines } from "@/components/skeletons/Bone";

/** Varied chip widths so the placeholder chips do not look like a grid of clones. */
const CHIP_WIDTHS = ["w-28", "w-24", "w-32", "w-20", "w-28", "w-24"];

/**
 * Hard skills cards. The number of cards and chips comes from the same static
 * data as the real SkillGroups, so the skeleton has the same height.
 */
export function SkillGroupsSkeleton() {
  return (
    <div aria-hidden="true" className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {techCategories.map((category) => (
        <div key={category.label} className="card-solid p-5 sm:p-6">
          <Bone className="h-6 w-48" />
          <div className="mt-4 flex flex-wrap gap-2">
            {category.items.map((item, i) => (
              <Bone key={item.name} className={`h-11 rounded-xl ${CHIP_WIDTHS[i % CHIP_WIDTHS.length]}`} />
            ))}
          </div>
          {category.more && category.more.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t-2 border-border pt-4">
              {category.more.map((item, i) => (
                <Bone key={item} className={`h-4 ${CHIP_WIDTHS[(i + 2) % CHIP_WIDTHS.length]}`} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** The closing "Say hello" section, same on Home and About. */
export function ContactCtaSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-t-2 border-border bg-background py-24 md:py-32"
    >
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <Bone className="h-9 w-full sm:h-10 md:h-12" />
          <Bone className="mt-3 h-9 w-2/3 sm:h-10 md:h-12" />
          <TextLines lines={3} className="mt-6 max-w-xl" lineClassName="h-4 md:h-5" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Bone className="h-11 w-full rounded-xl sm:w-64" />
            <Bone className="h-11 w-full rounded-xl sm:w-56" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** A section title plus an optional intro paragraph, as used above lists and grids. */
export function SectionHeadingSkeleton({ introLines = 2 }: { introLines?: number }) {
  return (
    <div aria-hidden="true" className="max-w-2xl">
      <Bone className="h-9 w-64 md:h-10" />
      {introLines > 0 && <TextLines lines={introLines} className="mt-4" />}
    </div>
  );
}
