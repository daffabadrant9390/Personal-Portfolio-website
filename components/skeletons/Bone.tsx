import { cn } from "@/lib/utils";

/** One shimmering placeholder block. Size and shape come from className. */
export function Bone({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("shimmer relative rounded-md", className)} />;
}

/** A paragraph as stacked lines; the last line is shorter, like real text. */
export function TextLines({
  lines,
  lineClassName = "h-4",
  className,
}: {
  lines: number;
  lineClassName?: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Bone
          key={i}
          className={cn(lineClassName, i === lines - 1 && lines > 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

/** Wraps a whole skeleton so assistive tech hears one "Loading" instead of every block. */
export function SkeletonRoot({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}
