"use client";

import React, { useState, useEffect } from "react";
import { toolbox, Category, Tool } from "../../../data/toolbox";
import { SystemMap } from "./toolbox/SystemMap";
import { NodeGraph } from "./toolbox/NodeGraph";
import { CategoryIcon } from "./toolbox/ToolIcons";
import { cn } from "@/lib/utils";

export function Toolbox() {
  // Filter out any categories with zero tools
  const visibleCategories = toolbox.filter((c) => c.tools && c.tools.length > 0);

  // Active category state
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    visibleCategories[0]?.id || "frontend"
  );

  const activeCategory: Category =
    visibleCategories.find((c) => c.id === activeCategoryId) ||
    visibleCategories[0];

  // Active selected tool state (defaults to primary or first tool in active category)
  const [selectedTool, setSelectedTool] = useState<Tool>(
    () =>
      activeCategory?.tools.find((t) => t.primary) ||
      activeCategory?.tools[0] || {
        id: "none",
        name: "No tool",
        subtitle: "",
        status: "shipped",
        projects: [],
      }
  );

  // When active category changes, switch selected tool to the new category's primary tool
  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    const cat = visibleCategories.find((c) => c.id === catId);
    if (cat && cat.tools.length > 0) {
      const primary = cat.tools.find((t) => t.primary) || cat.tools[0];
      setSelectedTool(primary);
    }
  };

  // Keyboard navigation for categories via numbers 1-9 or arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key >= "1" && e.key <= String(visibleCategories.length)) {
        const idx = parseInt(e.key, 10) - 1;
        if (visibleCategories[idx]) {
          handleSelectCategory(visibleCategories[idx].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visibleCategories]);

  return (
    <section
      id="toolbox"
      aria-label="Technical Stack and Capability Map"
      className="relative z-20 border-b border-line bg-[#070709] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="mx-auto max-w-7xl">
        {/* ============================================================== */}
        {/* Section Header (Matching Reference UI Design)                   */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-[13px] tracking-widest text-[#A0A0A8] uppercase font-semibold">
               TECHNICAL STACK
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text tracking-tight uppercase leading-none">
              TOOLBOX
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-muted-dim max-w-md leading-relaxed md:text-right">
            Tools, frameworks and technologies I use
            <br className="hidden sm:inline" /> to build modern web experiences.
          </p>
        </div>

        {/* ============================================================== */}
        {/* Mobile Horizontal Category Tabs (< 768px)                       */}
        {/* ============================================================== */}
        <div
          role="tablist"
          aria-label="Capabilities tabs"
          className="md:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none"
        >
          {visibleCategories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            const shippedCount = cat.tools.filter((t) => t.status === "shipped").length;
            const totalCount = cat.tools.length;

            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectCategory(cat.id)}
                className={cn(
                  "shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-all",
                  isActive
                    ? "border-accent bg-[#14190D] text-accent shadow-[0_0_12px_rgba(198,255,61,0.2)] font-semibold"
                    : "border-line bg-surface/40 text-muted hover:text-text"
                )}
              >
                <CategoryIcon name={cat.icon} className="h-3.5 w-3.5 shrink-0" />
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded",
                    isActive ? "bg-accent/20 text-accent" : "bg-surface text-muted-dim"
                  )}
                >
                  {shippedCount}/{totalCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* Main Chassis: System Map (Left) + Interactive Graph (Right)    */}
        {/* ============================================================== */}
        <div className="rounded-2xl border border-line/80 bg-[#0A0A0D] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left Column: System Map (Hidden on mobile tabs, shown md+) */}
          <div className="hidden md:block w-full lg:w-[320px] shrink-0 border-b lg:border-b-0 lg:border-r border-line/70 p-5 lg:p-6 bg-[#0C0C0F]/90">
            <SystemMap
              categories={visibleCategories}
              activeCategoryId={activeCategoryId}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          {/* Right Column: Node Graph Visualizer Canvas */}
          <div className="flex-1 bg-[#070709] relative min-h-[500px]">
            {activeCategory && (
              <NodeGraph
                key={activeCategory.id}
                category={activeCategory}
                selectedTool={selectedTool}
                onSelectTool={setSelectedTool}
              />
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* Bottom Hint Bar (Matching Reference UI Design)                 */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-2">
          {/* Left: Reticle Target + Instruction */}
          <div className="flex items-center gap-3">
            {/* SVG Target Reticle */}
            <div
              aria-hidden="true"
              className="relative flex items-center justify-center h-6 w-6 text-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current stroke-2">
                <circle cx="12" cy="12" r="7" className="stroke-accent" strokeWidth="1.5" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="1.5" fill="#C6FF3D" />
              </svg>
            </div>
            <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[#8A8A93] uppercase font-medium">
              INTERACTIVE SYSTEM CAPABILITY & TECH STACK GRAPH
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
export default Toolbox;
