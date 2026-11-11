"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import { ShimmerImage } from "@/components/shared/ShimmerImage";
import { aboutPhotos } from "@/lib/data/aboutPhotos";

/** Time each photo stays before the next one slides in. */
const AUTOPLAY_MS = 2500;
const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Where a slide sits relative to the active one:
 * 0 = active (front), 1 = next (peeks out behind, faded),
 * last = the one that just left (slides away and fades), the rest wait unseen.
 */
function slideStyle(pos: number, count: number): CSSProperties {
  if (pos === 0) return { transform: "translate3d(0,0,0) scale(1)", opacity: 1, zIndex: 30 };
  if (pos === 1) return { transform: "translate3d(13.6%,0,0) scale(0.93)", opacity: 0.4, zIndex: 20 };
  if (pos === count - 1) return { transform: "translate3d(-14%,0,0) scale(0.96)", opacity: 0, zIndex: 10 };
  return { transform: "translate3d(13.6%,0,0) scale(0.9)", opacity: 0, zIndex: 0 };
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia?.(query);
      if (!mq) return () => {};
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia?.(query).matches ?? false,
    () => false
  );
}

/**
 * Single photo carousel for the About hero on large screens. The active photo
 * is in front and the next one peeks out behind it, faded. It advances by
 * itself and pauses on hover or focus, when the tab is hidden, under reduced
 * motion, on small screens (where it is not shown), or when paused with the
 * button.
 */
export function AboutHeroCarousel() {
  const count = aboutPhotos.length;
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const playing = isDesktop && !reducedMotion && !userPaused && !interacting && !tabHidden;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, count]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos of Daffa"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
    >
      <div className="relative aspect-[4/5] w-full">
        {aboutPhotos.map((photo, i) => {
          const pos = (i - index + count) % count;
          return (
            <div
              key={photo.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={pos !== 0}
              style={slideStyle(pos, count)}
              className="absolute inset-y-0 left-0 w-[88%] overflow-hidden rounded-[1.25rem] border-2 border-foreground/10 bg-surface shadow-[0_20px_40px_-24px_rgba(0,0,0,0.45)] transition-[transform,opacity] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none"
            >
              <ShimmerImage
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="340px"
                className="object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          aria-label={userPaused ? "Play photo carousel" : "Pause photo carousel"}
          onClick={() => setUserPaused((p) => !p)}
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-card text-foreground transition-colors hover:border-foreground/40"
        >
          {userPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        </button>
        <div className="flex items-center" role="group" aria-label="Choose a photo">
          {aboutPhotos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${count}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className="flex h-8 items-center justify-center px-1"
            >
              <span
                className={`block h-2.5 rounded-full transition-all ${
                  i === index ? "w-7 bg-primary" : "w-2.5 bg-border"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
