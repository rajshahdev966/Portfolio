"use client";

import React, { forwardRef } from "react";
import { Tool, Status } from "../../../../data/toolbox";
import { ToolLogo } from "./ToolIcons";
import { cn } from "@/lib/utils";

interface ToolNodeProps {
  tool: Tool;
  isPrimary?: boolean;
  isSelected?: boolean;
  portSide?: "top" | "bottom" | "left" | "right";
  onClick?: () => void;
  onFocus?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const STATUS_CONFIG: Record<
  Status,
  { label: string; dotClass: string; textClass: string }
> = {
  shipped: {
    label: "SHIPPED",
    dotClass: "bg-accent shadow-[0_0_6px_#C6FF3D]",
    textClass: "text-accent",
  },
  "in-progress": {
    label: "IN PROGRESS",
    dotClass: "bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]",
    textClass: "text-[#00E5FF]",
  },
  learning: {
    label: "LEARNING",
    dotClass: "bg-[#FFB703] shadow-[0_0_6px_#FFB703]",
    textClass: "text-[#FFB703]",
  },
};

export const ToolNode = forwardRef<HTMLDivElement, ToolNodeProps>(
  (
    {
      tool,
      isPrimary = false,
      isSelected = false,
      portSide,
      onClick,
      onFocus,
      className,
      style,
    },
    ref
  ) => {
    const status = STATUS_CONFIG[tool.status] || STATUS_CONFIG.shipped;

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-pressed={isSelected}
        className={cn(
          "group relative flex items-center gap-3.5 rounded-xl border select-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer",
          isPrimary
            ? [
                "px-5 py-4 min-w-[200px] sm:min-w-[230px]",
                "bg-[#0E0E12]/95 border-accent",
                "shadow-[0_0_28px_rgba(198,255,61,0.22)] ring-1 ring-accent/50",
                isSelected && "shadow-[0_0_36px_rgba(198,255,61,0.4)] scale-[1.02]",
              ]
            : [
                "px-4 py-3 min-w-[175px] sm:min-w-[210px]",
                "bg-[#111115]/90 border-white/[0.14] hover:border-accent/60 hover:bg-[#141419]",
                isSelected
                  ? "border-accent bg-[#141419] shadow-[0_0_20px_rgba(198,255,61,0.2)]"
                  : "hover:shadow-[0_0_15px_rgba(198,255,61,0.08)]",
              ],
          className
        )}
        style={style}
      >
        {/* Connection Port Dot(s) */}
        {isPrimary ? (
          // Center node has connector ports on all 4 cardinal directions
          <>
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full border border-accent bg-[#0A0A0B] shadow-[0_0_6px_#C6FF3D]"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full border border-accent bg-[#0A0A0B] shadow-[0_0_6px_#C6FF3D]"
            />
            <span
              aria-hidden="true"
              className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full border border-accent bg-[#0A0A0B] shadow-[0_0_6px_#C6FF3D]"
            />
            <span
              aria-hidden="true"
              className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full border border-accent bg-[#0A0A0B] shadow-[0_0_6px_#C6FF3D]"
            />
          </>
        ) : portSide ? (
          // Satellite node port dot on the connecting edge
          <span
            aria-hidden="true"
            className={cn(
              "absolute h-2.5 w-2.5 rounded-full border border-accent bg-[#0A0A0B] shadow-[0_0_6px_#C6FF3D]",
              portSide === "top" && "-top-1.5 left-1/2 -translate-x-1/2",
              portSide === "bottom" && "-bottom-1.5 left-1/2 -translate-x-1/2",
              portSide === "left" && "-left-1.5 top-1/2 -translate-y-1/2",
              portSide === "right" && "-right-1.5 top-1/2 -translate-y-1/2"
            )}
          />
        ) : null}

        {/* Logo / Badge */}
        <ToolLogo id={tool.id} name={tool.name} icon={tool.icon} />

        {/* Tool Info */}
        <div className="flex flex-col text-left">
          <span
            className={cn(
              "font-display font-bold uppercase tracking-tight text-text leading-tight",
              isPrimary ? "text-[14px] sm:text-[15px]" : "text-[12px] sm:text-[13px]"
            )}
          >
            {tool.name}
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] text-muted-dim tracking-wider uppercase mt-0.5">
            {tool.subtitle}
          </span>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className={cn("h-1.5 w-1.5 rounded-full", status.dotClass)} />
            <span className={cn("font-mono text-[8.5px] font-semibold tracking-widest", status.textClass)}>
              {status.label}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ToolNode.displayName = "ToolNode";
