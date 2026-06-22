import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout container — handles:
 *   • mx-auto centering
 *   • max-w-7xl cap so content never stretches on ultra-wide screens
 *   • Responsive edge padding: 16px mobile → 24px sm → 32px lg
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
