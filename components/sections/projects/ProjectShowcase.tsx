"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ShimmerImage } from "@/components/shared/ShimmerImage";
import type { ProjectImage } from "@/lib/types";

interface ProjectShowcaseProps {
  images: ProjectImage[];
  /** Project title, used to label the viewer for assistive technology. */
  title: string;
}

/**
 * Screenshot viewer for a project page: one large screen at a time with
 * arrows, a counter, its caption and a thumbnail strip. Works with the
 * keyboard (left and right arrows) and by swiping on touch screens.
 */
export function ProjectShowcase({ images, title }: ProjectShowcaseProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;
  const current = images[index];
  const hasMultiple = count > 1;

  const go = useCallback(
    (direction: 1 | -1) => setIndex((i) => (i + direction + count) % count),
    [count]
  );

  if (!current) return null;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (!hasMultiple) return;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start === null || !hasMultiple) return;
        const delta = (e.changedTouches[0]?.clientX ?? start) - start;
        if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
      }}
      className="min-w-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-2 border-border bg-surface">
        <ShimmerImage
          key={index}
          src={current.src}
          alt={current.alt}
          fill
          preload={index === 0}
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover object-top"
        />

        {hasMultiple && (
          <>
            <span
              className="absolute left-3 top-3 rounded-full border border-border bg-background/90 px-2.5 py-1 font-mono text-[11px] font-medium text-foreground"
              aria-hidden="true"
            >
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-card text-foreground transition-colors hover:border-primary"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-card text-foreground transition-colors hover:border-primary"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      <p className="mt-3 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground" aria-live="polite">
        {current.caption ?? current.alt}
      </p>

      {hasMultiple && (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Choose a screenshot">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show screenshot ${i + 1} of ${count}`}
              aria-current={i === index ? "true" : undefined}
              className={`relative aspect-[16/10] w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-opacity ${
                i === index ? "border-primary" : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <ShimmerImage src={image.src} alt="" fill sizes="96px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
