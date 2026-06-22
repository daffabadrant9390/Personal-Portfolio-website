"use client";

import { Search } from "lucide-react";

export type SortOrder = "none" | "asc" | "desc";

interface ProjectFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

const chipBase = "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all";
const chipActive = "border-blue-600 bg-blue-600 text-white";
const chipInactive =
  "border-border bg-card text-muted-foreground hover:border-blue-300 dark:hover:border-blue-700 hover:text-foreground";

export function ProjectFilters({
  search, onSearchChange,
  categories, activeCategory, onCategoryChange,
  sortOrder, onSortChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by title..."
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5
                       text-sm text-foreground placeholder:text-muted-foreground/60 outline-none
                       transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>

        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as SortOrder)}
          aria-label="Sort projects by title"
          className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm
                     text-foreground outline-none transition-all sm:w-48
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
        >
          <option value="none">Sort: Default</option>
          <option value="asc">Title: A → Z</option>
          <option value="desc">Title: Z → A</option>
        </select>
      </div>

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
