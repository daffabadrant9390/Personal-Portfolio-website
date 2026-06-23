"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { cn } from "@/lib/utils";

interface ResponsiveOverlayProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  /**
   * Pinned title area, kept visible above the scrollable content. When set, the
   * desktop modal also renders a close button beside it; the mobile sheet keeps
   * its drag handle as the dismiss affordance.
   */
  header?: React.ReactNode;
  /**
   * Pinned action area, kept visible below the scrollable content (e.g. the
   * primary/secondary buttons). On mobile it sticks to the bottom of the sheet
   * so it stays reachable no matter how far the content is scrolled.
   */
  footer?: React.ReactNode;
  /** Width cap for the desktop modal, e.g. "max-w-sm" or "max-w-2xl". */
  maxWidthClass?: string;
}

/**
 * Centered modal on tablet/desktop, bottom sheet on mobile — same breakpoint
 * MobileMenu uses for its own drawer/overlay pattern.
 *
 * Both variants use a flex column: a fixed header (the drag handle on mobile),
 * a single scrollable content region, and an optional pinned footer. Only the
 * middle region scrolls, so the collapse handle and action buttons never
 * disappear with the content.
 */
export function ResponsiveOverlay({
  open,
  onClose,
  children,
  ariaLabel,
  header,
  footer,
  maxWidthClass = "max-w-sm",
}: ResponsiveOverlayProps) {
  const { isMobile } = useBreakpoint();
  const dragControls = useDragControls();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={onClose}
          />

          {isMobile ? (
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
              drag="y"
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => {
                // Dismiss when flung or dragged down past a comfortable threshold.
                if (info.offset.y > 120 || info.velocity.y > 600) onClose();
              }}
              className="fixed inset-x-0 bottom-0 z-[61] flex max-h-[85vh] flex-col
                         rounded-t-2xl border-t border-border bg-card shadow-xl"
            >
              {/* Pinned grab handle that collapses the sheet. */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                aria-label="Drag to dismiss"
                className="shrink-0 cursor-grab touch-none pt-3 pb-2 active:cursor-grabbing"
              >
                <div className="mx-auto h-1.5 w-10 rounded-full bg-border" />
              </div>

              {/* Pinned title header (optional). */}
              {header && (
                <div className="shrink-0 border-b border-border px-5 pb-3">{header}</div>
              )}

              {/* Scrollable content. */}
              <div
                className={cn(
                  "flex-1 overflow-y-auto px-5",
                  header ? "pt-4" : "",
                  footer ? "pb-5" : "pb-[max(1.5rem,env(safe-area-inset-bottom))]"
                )}
              >
                {children}
              </div>

              {/* Pinned footer (optional). */}
              {footer && (
                <div className="shrink-0 border-t border-border bg-card px-5 pt-4
                                pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  {footer}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[61] flex items-center justify-center p-4"
              onClick={onClose}
            >
              <div
                className={cn(
                  "flex w-full max-h-[85vh] flex-col rounded-2xl border border-border bg-card shadow-xl",
                  maxWidthClass
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {header && (
                  <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border p-6 pb-4">
                    <div className="min-w-0">{header}</div>
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close"
                      className="-mr-1 -mt-1 shrink-0 cursor-pointer rounded-lg p-1 text-muted-foreground
                                 hover:text-foreground transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
                <div className="flex-1 overflow-y-auto p-6">{children}</div>
                {footer && (
                  <div className="shrink-0 border-t border-border p-6 pt-4">{footer}</div>
                )}
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
