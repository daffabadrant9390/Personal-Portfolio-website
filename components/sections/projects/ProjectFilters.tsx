"use client";

import { useState } from "react";
import { Check, Filter, Search, X } from "lucide-react";
import { ResponsiveOverlay } from "@/components/shared/ResponsiveOverlay";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
} from "@/components/ui/select";

export type SortOrder = "none" | "asc" | "desc";

const sortLabels: Record<SortOrder, string> = {
  none: "Sort: Default",
  asc: "Title: A → Z",
  desc: "Title: Z → A",
};

interface ProjectFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

const sortChoices: SortOrder[] = ["none", "asc", "desc"];

const chipBase = "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all";
const chipActive = "border-primary bg-primary text-primary-foreground";
const chipInactive =
  "border-border bg-card text-muted-foreground hover:border-primary  hover:text-foreground";

export function ProjectFilters({
  search, onSearchChange,
  categories, activeCategory, onCategoryChange,
  sortOrder, onSortChange,
}: ProjectFiltersProps) {
  // Mobile sort sheet: the choice is held as a draft until Apply is pressed.
  const [sheetOpen, setSheetOpen] = useState(false);
  const [draftSort, setDraftSort] = useState<SortOrder>(sortOrder);

  const openSheet = () => {
    setDraftSort(sortOrder);
    setSheetOpen(true);
  };
  const applySort = () => {
    onSortChange(draftSort);
    setSheetOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by title..."
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <SelectRoot
          items={sortLabels}
          value={sortOrder}
          onValueChange={(val) => val && onSortChange(val as SortOrder)}
        >
          {/* Tablet and desktop keep the dropdown. */}
          <SelectTrigger aria-label="Sort projects by title" className="hidden md:flex">
            <span className="flex items-center gap-2">
              <Filter size={15} className="text-muted-foreground" />
              <SelectValue placeholder={sortLabels.none} />
            </span>
          </SelectTrigger>
          <SelectPopup>
            <SelectList>
              <SelectItem value="none">{sortLabels.none}</SelectItem>
              <SelectItem value="asc">{sortLabels.asc}</SelectItem>
              <SelectItem value="desc">{sortLabels.desc}</SelectItem>
            </SelectList>
          </SelectPopup>
        </SelectRoot>

        {/* Mobile: icon only, opens a bottom sheet. */}
        <button
          type="button"
          onClick={openSheet}
          aria-label="Sort projects"
          aria-haspopup="dialog"
          className="relative flex size-[42px] shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-foreground md:hidden"
        >
          <Filter size={16} />
          {sortOrder !== "none" && (
            <span
              data-testid="sort-active-dot"
              aria-hidden="true"
              className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary"
            />
          )}
        </button>
      </div>

      <ResponsiveOverlay
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        ariaLabel="Sort projects"
        header={
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-heading text-lg font-bold text-foreground">Sort by</h3>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label="Cancel"
              className="-mr-1 cursor-pointer rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>
        }
        footer={
          <button
            type="button"
            onClick={applySort}
            className="w-full cursor-pointer rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Apply
          </button>
        }
      >
        <div role="radiogroup" aria-label="Sort projects by title" className="flex flex-col gap-1">
          {sortChoices.map((choice) => {
            const selected = draftSort === choice;
            return (
              <button
                key={choice}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setDraftSort(choice)}
                className={`flex min-h-12 w-full cursor-pointer items-center justify-between rounded-xl border px-4 text-left text-sm transition-colors ${
                  selected
                    ? "border-primary bg-accent font-semibold text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-accent"
                }`}
              >
                {sortLabels[choice]}
                {selected && <Check size={16} className="text-primary" />}
              </button>
            );
          })}
        </div>
      </ResponsiveOverlay>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onCategoryChange(null)}
          className={`${chipBase} ${activeCategory === null ? chipActive : chipInactive}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={`${chipBase} ${activeCategory === cat ? chipActive : chipInactive}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
