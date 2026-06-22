"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";

interface ResponsiveOverlayProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  /** Width cap for the desktop modal, e.g. "max-w-sm" or "max-w-2xl". */
  maxWidthClass?: string;
}

/**
 * Centered modal on tablet/desktop, bottom sheet on mobile — same breakpoint
 * MobileMenu uses for its own drawer/overlay pattern.
 */
export function ResponsiveOverlay({
  open,
  onClose,
  children,
  ariaLabel,
  maxWidthClass = "max-w-sm",
}: ResponsiveOverlayProps) {
  const { isMobile } = useBreakpoint();

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
              className="fixed inset-x-0 bottom-0 z-[61] max-h-[85vh] overflow-y-auto
                         rounded-t-2xl border-t border-border bg-card
                         px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]
                         shadow-xl"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
              {children}
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
                className={`w-full ${maxWidthClass} max-h-[85vh] overflow-y-auto
                           rounded-2xl border border-border bg-card p-6 shadow-xl`}
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
