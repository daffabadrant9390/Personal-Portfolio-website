"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { ShimmerImage } from "@/components/shared/ShimmerImage";
import { aboutPhotos as PHOTOS } from "@/lib/data/aboutPhotos";

/**
 * Phones and tablets only: from lg the same photos play in the About hero
 * (AboutHeroCarousel), so this section is hidden there.
 *
 * Photo carousel that follows the same container and edge padding as the rest
 * of the page, with the photos filling the width between the margins. Several
 * photos are visible at once (1 on phones with the next one peeking in, up to
 * 4 on wide screens) and it scrolls with native scroll snap, so swiping,
 * trackpads and keyboard scrolling all work. Arrows and bullets move by one
 * screenful.
 */
export function AboutGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 1) {
      setPageCount(1);
      setPage(0);
      return;
    }
    const pages = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05));
    setPageCount(pages);
    setPage(Math.round((el.scrollLeft / max) * (pages - 1)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(onScroll);
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [sync]);

  const behavior = (): ScrollBehavior =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: behavior() });
  };

  const goToPage = (target: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const left = pageCount > 1 ? (target / (pageCount - 1)) * max : 0;
    el.scrollTo({ left, behavior: behavior() });
  };

  const atStart = page <= 0;
  const atEnd = page >= pageCount - 1;

  const arrowClass =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-foreground/80 bg-card text-foreground shadow-md transition-opacity hover:bg-background disabled:opacity-40 sm:h-12 sm:w-12";

  return (
    <section
      aria-label="Photo gallery"
      className="border-t-2 border-border bg-background py-10 md:py-14 lg:hidden"
    >
      <Container>
        <h2 className="mb-6 font-heading text-2xl font-extrabold tracking-[-0.02em] text-foreground sm:text-3xl">
          A little more about me
        </h2>

        <div className="relative">
          <div
            ref={trackRef}
            role="region"
            aria-label="Photos, scroll sideways to see more"
            tabIndex={0}
            style={{ "--gap": "1rem" } as CSSProperties}
            className="no-scrollbar flex snap-x snap-mandatory gap-[var(--gap)] overflow-x-auto [--v:1.15] sm:[--v:2.15] lg:[--v:3] xl:[--v:4]"
          >
            {PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/5] w-[calc((100%-var(--gap)*(var(--v)-1))/var(--v))] flex-none snap-start overflow-hidden rounded-[1.25rem] border-2 border-foreground/10"
              >
                <ShimmerImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 87vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous photos"
            disabled={atStart}
            onClick={() => scrollByPage(-1)}
            className={`${arrowClass} left-3 sm:left-4`}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next photos"
            disabled={atEnd}
            onClick={() => scrollByPage(1)}
            className={`${arrowClass} right-3 sm:right-4`}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>

        {pageCount > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1" role="group" aria-label="Choose a set of photos">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photos ${i + 1} of ${pageCount}`}
                aria-current={i === page ? "true" : undefined}
                onClick={() => goToPage(i)}
                className="flex h-8 items-center justify-center px-1"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all ${
                    i === page ? "w-7 bg-primary" : "w-2.5 bg-border"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
