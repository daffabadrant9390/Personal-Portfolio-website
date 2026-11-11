import { Container } from "@/components/shared/Container";

/**
 * Placeholder shown by loading.tsx while a database backed page renders on the
 * server. It lets the navigation happen immediately instead of the old page
 * sitting frozen until the data arrives.
 */
export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <main className="min-h-screen bg-background" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      <section className="pt-32 pb-12 md:pt-40">
        <Container>
          <div className="shimmer relative h-10 w-3/4 max-w-xl rounded-lg bg-surface md:h-14" />
          <div className="shimmer relative mt-5 h-4 w-full max-w-lg rounded bg-surface" />
          <div className="shimmer relative mt-2 h-4 w-2/3 max-w-md rounded bg-surface" />
        </Container>
      </section>
      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: cards }, (_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border-2 border-border bg-card">
                <div className="shimmer relative h-44 bg-surface" />
                <div className="space-y-3 p-5">
                  <div className="shimmer relative h-5 w-2/3 rounded bg-surface" />
                  <div className="shimmer relative h-3 w-full rounded bg-surface" />
                  <div className="shimmer relative h-3 w-5/6 rounded bg-surface" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
