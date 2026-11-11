"use client";

import { useCallback, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

/**
 * next/image with a loading state. Drop it inside a positioned container
 * (relative, with a size or aspect ratio) and give it `fill`, like the
 * regular Image.
 *
 * - While the file downloads, a shimmer fills the container.
 * - The shimmer sits behind the image instead of hiding it, so the photo is
 *   painted the moment it arrives and nothing waits on hydration (this keeps
 *   LCP images fast).
 * - If a remote image fails through the Next.js optimizer (slow or oversized
 *   file, upstream hiccup), it is retried once straight from its own URL
 *   before giving up.
 * - If it still fails (missing object, blocked URL), a quiet placeholder with
 *   an icon is shown instead of a broken image.
 */
export function ShimmerImage({ onLoad, onError, alt, ...props }: ImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [unoptimized, setUnoptimized] = useState(props.unoptimized ?? false);

  // A cached image can finish loading before React attaches onLoad, so check
  // the element itself once it mounts.
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) {
      setStatus((s) => (s === "loading" ? "loaded" : s));
    }
  }, []);

  if (status === "error") {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex items-center justify-center bg-surface text-muted-foreground"
      >
        <ImageOff size={28} aria-hidden="true" />
      </div>
    );
  }

  return (
    <>
      {status === "loading" && (
        <span data-testid="image-shimmer" aria-hidden="true" className="shimmer absolute inset-0" />
      )}
      <Image
        {...props}
        unoptimized={unoptimized}
        ref={imgRef}
        alt={alt}
        onLoad={(event) => {
          setStatus("loaded");
          onLoad?.(event);
        }}
        onError={(event) => {
          if (!unoptimized && typeof props.src === "string" && /^https?:\/\//.test(props.src)) {
            setUnoptimized(true);
          } else {
            setStatus("error");
          }
          onError?.(event);
        }}
      />
    </>
  );
}
