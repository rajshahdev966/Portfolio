"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { flagshipProjects } from "@/content/projects";
import { Badge } from "@/components/ui/Badge";
import { MediaPendingCard } from "@/components/ui/MediaPendingCard";
import { ProjectArchive } from "./ProjectArchive";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";
import { gsap } from "@/lib/gsap";

export function SelectedWork() {
  const { isCalm } = usePrefersCalm();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [expandedMobileSlug, setExpandedMobileSlug] = useState<string | null>(null);

  const previewBoxRef = useRef<HTMLDivElement>(null);
  const quickToRef = useRef<{ x: (n: number) => void; y: (n: number) => void } | null>(null);

  // Setup cursor following lerp for the floating video/image preview
  useEffect(() => {
    if (isCalm || window.matchMedia("(pointer: coarse)").matches) return;

    const box = previewBoxRef.current;
    if (!box) return;

    const xSetter = gsap.quickTo(box, "x", { duration: 0.28, ease: "power2.out" });
    const ySetter = gsap.quickTo(box, "y", { duration: 0.28, ease: "power2.out" });
    quickToRef.current = { x: xSetter, y: ySetter };

    const onMouseMove = (e: MouseEvent) => {
      quickToRef.current?.x(e.clientX + 24);
      quickToRef.current?.y(e.clientY - 120);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isCalm]);

  const activeProject = flagshipProjects.find((p) => p.slug === activeSlug);

  return (
    <section
      id="work"
      aria-label="Selected Engineering Work"
      className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 border-b border-line"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b border-line pb-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              [ 01 / 06 ] · SELECTED BUILDS
            </span>
            <h2 className="text-heading-2 text-text font-bold uppercase tracking-tight">
              Selected Work
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-muted max-w-md leading-relaxed">
            Original products, developer tools, and browser mechanics designed around real user problems.
          </p>
        </div>

        {/* 6 Flagship Rows */}
        <div
          onMouseLeave={() => setActiveSlug(null)}
          className="flex flex-col divide-y divide-line"
        >
          {flagshipProjects.map((project, idx) => {
            const isHovered = activeSlug === project.slug;
            const isDimmed = activeSlug !== null && !isHovered;
            const isMobileExpanded = expandedMobileSlug === project.slug;

            return (
              <div
                key={project.slug}
                onMouseEnter={() => setActiveSlug(project.slug)}
                className={`group relative flex flex-col py-8 sm:py-10 transition-opacity duration-300 ${
                  isDimmed ? "opacity-30" : "opacity-100"
                }`}
                data-cursor="view"
              >
                {/* Main Interactive Row Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Index & Giant Title */}
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-xs sm:text-sm text-muted-dim font-bold">
                      0{idx + 1}
                    </span>
                    <Link
                      href={`/work/${project.slug}`}
                      className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-text group-hover:text-accent group-hover:translate-x-2 transition-all duration-200"
                    >
                      {project.title}
                    </Link>
                  </div>

                  {/* Center/Right: Category, Tech Tags, Year & Status */}
                  <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    <span className="font-mono text-xs text-muted">
                      {project.category}
                    </span>
                    <span className="text-line-bright hidden sm:inline">/</span>

                    <div className="hidden sm:flex items-center gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] text-muted-dim border border-line rounded px-2 py-0.5 bg-surface/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-line-bright hidden sm:inline">/</span>
                    <span className="font-mono text-xs text-muted-dim">
                      {project.year}
                    </span>

                    <Badge
                      variant={
                        project.statusType === "live"
                          ? "live"
                          : project.statusType === "source"
                          ? "source"
                          : "concept"
                      }
                      size="sm"
                      dot
                    >
                      {project.status}
                    </Badge>

                    {/* Desktop Hover Link Arrow */}
                    <Link
                      href={`/work/${project.slug}`}
                      aria-label={`View ${project.title} case study`}
                      className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-text group-hover:border-accent group-hover:bg-accent group-hover:text-[#0A0A0B] transition-all"
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </Link>

                    {/* Mobile Tap Toggle Button */}
                    <button
                      onClick={() =>
                        setExpandedMobileSlug(isMobileExpanded ? null : project.slug)
                      }
                      className="lg:hidden ml-auto font-mono text-[11px] uppercase tracking-wider text-accent border border-accent/40 rounded px-2.5 py-1 bg-accent/5"
                    >
                      {isMobileExpanded ? "Hide Preview" : "Preview"}
                    </button>
                  </div>
                </div>

                {/* Subtitle / Summary Line */}
                <p className="mt-3 font-sans text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
                  {project.summary}
                </p>

                {/* Mobile Inline Preview Drawer (When tapped on touch screens) */}
                {isMobileExpanded && (
                  <div className="mt-6 lg:hidden overflow-hidden rounded-xl border border-line bg-surface p-4">
                    <MediaPendingCard
                      projectTitle={project.title}
                      assetName={project.media.poster}
                      aspectRatio="video"
                    />
                    <div className="mt-4 flex justify-end">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent font-semibold"
                      >
                        <span>Read full case study</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Desktop Video/Media Preview Window following cursor */}
        {!isCalm && (
          <div
            ref={previewBoxRef}
            aria-hidden="true"
            className={`pointer-events-none fixed top-0 left-0 z-35 hidden lg:block w-72 sm:w-80 overflow-hidden rounded-[20px] border border-line-bright bg-surface/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-opacity duration-200 ${
              activeSlug ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {activeProject && (
              <div className="p-2">
                <MediaPendingCard
                  projectTitle={activeProject.title}
                  assetName={activeProject.media.poster}
                  aspectRatio="video"
                />
                <div className="flex items-center justify-between p-2 font-mono text-[10px] text-muted">
                  <span className="text-accent">{activeProject.category}</span>
                  <span>{activeProject.status}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project Archive Table */}
        <ProjectArchive />
      </div>
    </section>
  );
}
