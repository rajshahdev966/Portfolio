"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Category, Tool } from "../../../../data/toolbox";
import { getSlots, SlotPosition, CENTER_SLOT } from "@/lib/getSlots";
import { ToolNode } from "./ToolNode";
import { cn } from "@/lib/utils";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";

interface NodeGraphProps {
  category: Category;
  selectedTool: Tool;
  onSelectTool: (tool: Tool) => void;
  className?: string;
}

interface ConnectorLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  centerPort: "top" | "bottom" | "left" | "right";
  nodePort: "top" | "bottom" | "left" | "right";
}

export function NodeGraph({
  category,
  selectedTool,
  onSelectTool,
  className,
}: NodeGraphProps) {
  const { isCalm } = usePrefersCalm();
  const containerRef = useRef<HTMLDivElement>(null);
  const centerNodeRef = useRef<HTMLDivElement>(null);
  const satelliteRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Identify primary center tool vs satellite tools (memoized)
  const primaryTool = useMemo(
    () => category.tools.find((t) => t.primary) || category.tools[0] || null,
    [category.tools]
  );

  const satelliteTools = useMemo(
    () => category.tools.filter((t) => t.id !== primaryTool?.id),
    [category.tools, primaryTool?.id]
  );

  // Slot positions for desktop/tablet layout (memoized)
  const slots: SlotPosition[] = useMemo(
    () => getSlots(satelliteTools.length),
    [satelliteTools.length]
  );

  // Computed connector coordinates
  const [connectors, setConnectors] = useState<ConnectorLine[]>([]);

  // Function to calculate exact port coordinates relative to container
  const updateConnectors = useCallback(() => {
    if (!containerRef.current || !centerNodeRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerNodeRef.current.getBoundingClientRect();

    if (containerRect.width === 0 || containerRect.height === 0) return;

    const getPortCoords = (
      rect: DOMRect,
      port: "top" | "bottom" | "left" | "right"
    ) => {
      switch (port) {
        case "top":
          return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top - containerRect.top,
          };
        case "bottom":
          return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.bottom - containerRect.top,
          };
        case "left":
          return {
            x: rect.left - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          };
        case "right":
          return {
            x: rect.right - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          };
      }
    };

    const lines: ConnectorLine[] = [];

    satelliteTools.forEach((tool, idx) => {
      const el = satelliteRefs.current[idx];
      const slot = slots[idx];
      if (!el || !slot) return;

      const satRect = el.getBoundingClientRect();
      const p1 = getPortCoords(centerRect, slot.centerPort);
      const p2 = getPortCoords(satRect, slot.nodePort);

      lines.push({
        id: `${primaryTool?.id || "center"}->${tool.id}`,
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        centerPort: slot.centerPort,
        nodePort: slot.nodePort,
      });
    });

    setConnectors((prev) => {
      if (prev.length !== lines.length) return lines;
      const isIdentical = lines.every((newLine, i) => {
        const oldLine = prev[i];
        if (!oldLine || oldLine.id !== newLine.id) return false;
        return (
          Math.abs(oldLine.x1 - newLine.x1) < 0.5 &&
          Math.abs(oldLine.y1 - newLine.y1) < 0.5 &&
          Math.abs(oldLine.x2 - newLine.x2) < 0.5 &&
          Math.abs(oldLine.y2 - newLine.y2) < 0.5
        );
      });
      return isIdentical ? prev : lines;
    });
  }, [primaryTool?.id, satelliteTools, slots]);

  // Recalculate positions on resize and category change
  useEffect(() => {
    let rafId: number;

    const measure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateConnectors();
      });
    };

    measure();

    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      measure();
    });

    ro.observe(el);
    if (centerNodeRef.current) ro.observe(centerNodeRef.current);
    satelliteRefs.current.forEach((node) => {
      if (node) ro.observe(node);
    });

    const timer = setTimeout(measure, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      ro.disconnect();
    };
  }, [updateConnectors, category.id]);

  // Generate cubic bezier or stepped orthogonal circuit path
  const makePath = (conn: ConnectorLine) => {
    const { x1, y1, x2, y2, centerPort, nodePort } = conn;

    // Direct vertical connection
    if (Math.abs(x1 - x2) < 4) {
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }

    // Direct horizontal connection
    if (Math.abs(y1 - y2) < 4) {
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }

    // Circuit curve matching the reference UI
    if (centerPort === "top" || centerPort === "bottom") {
      const midY = (y1 + y2) / 2;
      return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
    } else {
      const midX = (x1 + x2) / 2;
      return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
    }
  };

  const handleToolSelect = (tool: Tool) => {
    onSelectTool(tool);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full rounded-2xl border border-line bg-[#08080A] overflow-hidden select-none flex flex-col",
        className
      )}
    >
      {/* Background Subtle Tech Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #C6FF3D 1px, transparent 1px), linear-gradient(to bottom, #C6FF3D 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Top Header / Breadcrumb Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-line/40">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_#C6FF3D]"
          />
          <h3 className="font-display font-bold text-xs sm:text-sm tracking-wider text-accent uppercase">
            {category.label}
          </h3>
          {category.breadcrumb && (
            <>
              <span className="text-muted-dim text-xs">/</span>
              <span className="font-mono text-[10px] text-muted-dim tracking-widest uppercase hidden sm:inline">
                {category.breadcrumb}
              </span>
            </>
          )}
        </div>

        <div className="font-mono text-[10px] text-muted-dim uppercase tracking-wider">
          {category.tools.length} NODES LINKED
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP / TABLET CANVAS GRAPH (hidden on < 768px)               */}
      {/* ============================================================== */}
      <div className="relative hidden md:block w-full h-[580px] lg:h-[620px]">
        {/* SVG Cable Connector Layer */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full z-0 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <filter id="cable-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {connectors.map((conn) => {
            const isConnActive =
              selectedTool.id === conn.id.split("->")[1] ||
              selectedTool.id === primaryTool?.id;

            return (
              <g key={conn.id}>
                {/* Glow halo */}
                <path
                  d={makePath(conn)}
                  fill="none"
                  stroke={isConnActive ? "#C6FF3D" : "#C6FF3D"}
                  strokeWidth={isConnActive ? "3.5" : "1.8"}
                  strokeOpacity={isConnActive ? 0.3 : 0.15}
                  filter="url(#cable-glow)"
                />
                {/* Main line */}
                <path
                  d={makePath(conn)}
                  fill="none"
                  stroke={isConnActive ? "#C6FF3D" : "#C6FF3D"}
                  strokeWidth={isConnActive ? "1.75" : "1.2"}
                  strokeOpacity={isConnActive ? 0.95 : 0.65}
                  className={cn(
                    "transition-all duration-300",
                    !isCalm && "animate-pulse"
                  )}
                  style={{
                    strokeDasharray: isConnActive ? "none" : "none",
                  }}
                />
                {/* Center port terminal dot */}
                <circle
                  cx={conn.x1}
                  cy={conn.y1}
                  r={3}
                  fill="#08080A"
                  stroke="#C6FF3D"
                  strokeWidth="1.5"
                />
                {/* Satellite port terminal dot */}
                <circle
                  cx={conn.x2}
                  cy={conn.y2}
                  r={3}
                  fill="#08080A"
                  stroke="#C6FF3D"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>

        {/* Center Primary Node */}
        {primaryTool && (
          <div
            className="absolute z-20"
            style={{
              left: `${CENTER_SLOT.x}%`,
              top: `${CENTER_SLOT.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <ToolNode
              ref={centerNodeRef}
              tool={primaryTool}
              isPrimary
              isSelected={selectedTool.id === primaryTool.id}
              onClick={() => handleToolSelect(primaryTool)}
            />
          </div>
        )}

        {/* Satellite Nodes positioned around center */}
        {satelliteTools.map((tool, idx) => {
          const slot = slots[idx];
          if (!slot) return null;

          return (
            <div
              key={tool.id}
              className="absolute z-10"
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <ToolNode
                ref={(el) => {
                  satelliteRefs.current[idx] = el;
                }}
                tool={tool}
                portSide={slot.nodePort}
                isSelected={selectedTool.id === tool.id}
                onClick={() => handleToolSelect(tool)}
              />
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* MOBILE VERTICAL STACK (< 768px)                                */}
      {/* ============================================================== */}
      <div className="relative md:hidden p-4 flex flex-col gap-3">
        {/* Continuous vertical timeline connector line */}
        <div
          aria-hidden="true"
          className="absolute left-7 top-6 bottom-6 w-[2px] bg-gradient-to-b from-accent via-accent/40 to-transparent"
        />

        {/* Primary node on top */}
        {primaryTool && (
          <div className="relative pl-6">
            <ToolNode
              tool={primaryTool}
              isPrimary
              isSelected={selectedTool.id === primaryTool.id}
              onClick={() => handleToolSelect(primaryTool)}
            />
          </div>
        )}

        {/* Satellite nodes listed vertically */}
        {satelliteTools.map((tool) => (
          <div key={tool.id} className="relative pl-6">
            <ToolNode
              tool={tool}
              isSelected={selectedTool.id === tool.id}
              onClick={() => handleToolSelect(tool)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
