"use client";

import { useState } from "react";
import { getDeviconUrl } from "@/lib/devicons";

export function TechBadge({ tag }: { tag: string }) {
  const [errored, setErrored] = useState(false);
  const src = !errored ? getDeviconUrl(tag) : undefined;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border
                     bg-background px-2 py-1 text-[10px] sm:text-[11px] font-medium
                     text-muted-foreground">
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="h-3 w-3 object-contain"
          loading="lazy"
          onError={() => setErrored(true)}
        />
      )}
      {tag}
    </span>
  );
}
