"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  alt: string;
  /** Controls the gallery's height — pass a Tailwind height class. */
  heightClass?: string;
}

export function ProjectGallery({ images, alt, heightClass = "h-44" }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div className={`group relative overflow-hidden ${heightClass}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="img"
          aria-label={alt}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${images[index]}')` }}
        />
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2
                       flex h-7 w-7 items-center justify-center rounded-full
                       bg-black/40 text-white transition-opacity hover:bg-black/60
                       opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2
                       flex h-7 w-7 items-center justify-center rounded-full
                       bg-black/40 text-white transition-opacity hover:bg-black/60
                       opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight size={14} />
          </button>

          <div className="absolute bottom-2 inset-x-0 z-10 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
