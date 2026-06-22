"use client";

import { AlertCircle, X } from "lucide-react";
import { ResponsiveOverlay } from "@/components/shared/ResponsiveOverlay";

interface ErrorFeedbackProps {
  open: boolean;
  title?: string;
  errors: string[];
  onClose: () => void;
}

export function ErrorFeedback({ open, title = "Please fix the highlighted fields", errors, onClose }: ErrorFeedbackProps) {
  if (errors.length === 0) return null;

  return (
    <ResponsiveOverlay open={open} onClose={onClose} ariaLabel={title} maxWidthClass="max-w-sm">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full shrink-0 flex items-center justify-center
                          bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40">
            <AlertCircle size={18} className="text-red-500" />
          </div>
          <h3 className="font-heading font-bold text-base text-foreground">{title}</h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="-mr-1 -mt-1 p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <ul className="space-y-2 mb-5">
        {errors.map((err, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-red-500 shrink-0" />
            {err}
          </li>
        ))}
      </ul>

      <button
        onClick={onClose}
        className="w-full rounded-xl bg-blue-700 hover:bg-blue-600 px-4 py-2.5
                   text-sm font-semibold text-white transition-all"
      >
        Got it
      </button>
    </ResponsiveOverlay>
  );
}
