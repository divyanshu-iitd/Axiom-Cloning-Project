"use client";

import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  List,
  Eye,
  BarChart3,
  Filter,
  Settings,
} from "lucide-react";

interface ColumnHeaderProps {
  title: string;
  count?: number;
  sortKey?: string;
  currentSort?: { column: string | null; direction: "asc" | "desc" };
  onSort?: (column: string, direction: "asc" | "desc") => void;
  preset?: "P1" | "P2" | "P3" | null;
  onPresetChange?: (preset: "P1" | "P2" | "P3") => void;
  isGridView?: boolean;
  onViewToggle?: () => void;
}

/**
 * Column header matching Axiom Pulse EXACTLY
 * Structure: Title → P1/P2/P3 → Toolbar Icons
 */
export const ColumnHeader = React.memo<ColumnHeaderProps>(
  ({
    title,
    count = 0,
    sortKey,
    currentSort,
    onSort,
    preset,
    onPresetChange,
    isGridView = true,
    onViewToggle,
  }) => {
    const handleSortClick = React.useCallback(() => {
      if (sortKey && onSort) {
        if (currentSort?.column === sortKey) {
          onSort(
            sortKey,
            currentSort.direction === "asc" ? "desc" : "asc"
          );
        } else {
          onSort(sortKey, "asc");
        }
      }
    }, [sortKey, currentSort, onSort]);

    const isSorted = currentSort?.column === sortKey;
    const sortIcon =
      isSorted && currentSort.direction === "asc" ? (
        <ArrowUp className="h-3 w-3 text-[rgba(255,255,255,0.65)]" />
      ) : isSorted && currentSort.direction === "desc" ? (
        <ArrowDown className="h-3 w-3 text-[rgba(255,255,255,0.65)]" />
      ) : sortKey ? (
        <ArrowUpDown className="h-3 w-3 text-[rgba(255,255,255,0.45)]" />
      ) : null;

    return (
      <div className="flex flex-col gap-[8px]">
        {/* Title, Count, and Sort */}
        <div className="flex items-center gap-[8px]">
          <div
            className={cn(
              "flex items-center gap-[8px]",
              sortKey && "cursor-pointer select-none"
            )}
            onClick={handleSortClick}
          >
            <h3 className="text-sm font-[600] leading-[18px] text-white">
              {title}
            </h3>
            <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.45)]">
              {count} 0
            </span>
            {sortIcon}
          </div>
        </div>

        {/* P1/P2/P3 Preset Buttons - Inside column, below title */}
        <div className="flex items-center gap-[6px]">
          {(["P1", "P2", "P3"] as const).map((p) => (
            <button
              key={p}
              onClick={() => onPresetChange?.(p)}
              className={cn(
                "h-[24px] rounded-[6px] px-[8px] text-[10px] font-[600] leading-[14px] transition-all duration-200",
                preset === p
                  ? "bg-[#3B82F6] text-white shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.65)] hover:bg-[rgba(255,255,255,0.1)]"
              )}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Toolbar Icons Row */}
        <div className="flex items-center gap-[4px]">
          {/* Grid/List Toggle */}
          <button
            onClick={onViewToggle}
            className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.65)] transition-colors hover:bg-[rgba(255,255,255,0.1)]"
          >
            {isGridView ? (
              <LayoutGrid className="h-[12px] w-[12px]" />
            ) : (
              <List className="h-[12px] w-[12px]" />
            )}
          </button>

          {/* Display Settings */}
          <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.65)] transition-colors hover:bg-[rgba(255,255,255,0.1)]">
            <Eye className="h-[12px] w-[12px]" />
          </button>

          {/* Chart */}
          <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.65)] transition-colors hover:bg-[rgba(255,255,255,0.1)]">
            <BarChart3 className="h-[12px] w-[12px]" />
          </button>

          {/* Filter */}
          <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.65)] transition-colors hover:bg-[rgba(255,255,255,0.1)]">
            <Filter className="h-[12px] w-[12px]" />
          </button>

          {/* Settings */}
          <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.65)] transition-colors hover:bg-[rgba(255,255,255,0.1)]">
            <Settings className="h-[12px] w-[12px]" />
          </button>
        </div>
      </div>
    );
  }
);

ColumnHeader.displayName = "ColumnHeader";
