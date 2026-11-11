import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Shimmering placeholder block. Use it for any content that is still loading
 * (text lines, cards, avatars, rows fetched from the database). Size and shape
 * come from className, e.g. <Skeleton className="h-4 w-40 rounded-md" />.
 */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden="true" className={cn("shimmer relative rounded-xl", className)} {...props} />;
}
