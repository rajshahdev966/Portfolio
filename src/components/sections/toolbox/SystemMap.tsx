"use client";

import React from "react";
import { LayoutGrid, ArrowRight } from "lucide-react";
import { Category } from "../../../../data/toolbox";
import { CategoryIcon } from "./ToolIcons";
import { cn } from "@/lib/utils";

interface SystemMapProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  className?: string;
}

export function SystemMap({
  categories,
  activeCategoryId,
  onSelectCategory,
  className,
}: SystemMapProps) {
  // Filter out any categories with 0 tools as requested
  const visibleCategories = categories.filter((c) => c.tools && c.tools.length > 0);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % visibleCategories.length;
      onSelectCategory(visibleCategories[next].id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + visibleCategories.length) % visibleCategories.length;
      onSelectCategory(visibleCategories[prev].id);
    }
  };

  return (
    <aside
      aria-label="System Map Capability Index"
      className={cn("flex flex-col select-none", className)}
    >
      {/* Panel Header */}
      <div className="flex items-center gap-2.5 px-3 pb-5 border-b border-line/60 mb-3">
        <LayoutGrid className="h-4 w-4 text-accent" />
        <div className="flex flex-col">
          <span className="font-display font-bold text-sm tracking-wide text-text uppercase">
            SYSTEM MAP
          </span>
          <span className="font-mono text-[10px] text-muted-dim tracking-wider uppercase">
            SELECT A CAPABILITY
          </span>
        </div>
      </div>

      {/* Category List */}
      <nav aria-label="Toolbox Categories" className="flex flex-col gap-2">
        {visibleCategories.map((category, index) => {
          const isActive = category.id === activeCategoryId;
          const shippedCount = category.tools.filter((t) => t.status === "shipped").length;
          const totalCount = category.tools.length;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "group relative flex items-center justify-between px-4 py-3.5 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer",
                isActive
                  ? "border-accent bg-[#14190D] shadow-[0_0_20px_rgba(198,255,61,0.15)] text-accent"
                  : "border-transparent bg-surface/30 hover:bg-surface/70 hover:border-line text-muted hover:text-text"
              )}
            >
              {/* Left edge lime accent bar when active */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-accent shadow-[0_0_8px_#C6FF3D]"
                />
              )}

              {/* Icon & Label */}
              <div className="flex items-center gap-3.5 min-w-0 pr-2">
                <span
                  className={cn(
                    "shrink-0 transition-colors",
                    isActive ? "text-accent" : "text-muted group-hover:text-text"
                  )}
                >
                  <CategoryIcon name={category.icon} className="h-4 w-4" />
                </span>
                <span
                  className={cn(
                    "font-sans font-medium text-xs sm:text-[13px] truncate",
                    isActive ? "text-accent font-semibold" : "text-text/90"
                  )}
                >
                  {category.label}
                </span>
              </div>

              {/* Shipped/Total Count & Arrow */}
              <div className="flex items-center gap-2.5 shrink-0 font-mono text-xs">
                <span
                  className={cn(
                    "text-[11px] font-semibold tabular-nums",
                    isActive ? "text-accent" : "text-muted-dim group-hover:text-muted"
                  )}
                >
                  {shippedCount}/{totalCount}
                </span>
                <ArrowRight
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    isActive
                      ? "text-accent translate-x-0.5"
                      : "text-muted-dim group-hover:text-muted group-hover:translate-x-0.5"
                  )}
                />
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
