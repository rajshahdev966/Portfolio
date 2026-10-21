"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Code2, Box, Zap, ExternalLink, Sparkles } from "lucide-react";
import { Tool } from "../../../../data/toolbox";
import { getProjectBySlug } from "@/content/projects";
import { cn } from "@/lib/utils";

interface UsedInPanelProps {
  tool: Tool;
  className?: string;
}

export function UsedInPanel({ tool, className }: UsedInPanelProps) {
  const projectSlug = tool.projects && tool.projects.length > 0 ? tool.projects[0] : null;
  const project = projectSlug ? getProjectBySlug(projectSlug) : null;

  // Icons for the 3 highlight bullets matching reference UI
  const bulletIcons = [Code2, Box, Zap];

  const highlights =
    tool.highlights && tool.highlights.length > 0
      ? tool.highlights
      : project
      ? [
          project.subtitle,
          `Engineered with ${tool.name}`,
          `Verified in ${project.title} codebase`,
        ]
      : [
          "Core software engineering foundation",
          "Applied in personal tools & university labs",
          "Documented in personal learning notes",
        ];

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-line/80 bg-[#0E0E12]/95 backdrop-blur-md p-4 sm:p-5 shadow-2xl corner-ticks select-none transition-all duration-300",
        className
      )}
    >
      {/* Corner Ticks (Matching Reference UI Brackets) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-accent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-1 -right-1 h-2.5 w-2.5 border-t-2 border-r-2 border-accent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b-2 border-l-2 border-accent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-accent"
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-line/60">
        <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-semibold">
          <span className="text-muted-dim">USED IN</span>
          <span className="text-accent font-bold">→</span>
          <span className="text-accent tracking-widest">
            {project ? project.title : "CORE FOUNDATION"}
          </span>
        </div>

        {project && (
          <Link
            href={`/work/${project.slug}`}
            className="flex items-center gap-1 font-mono text-[10px] text-muted-dim hover:text-accent transition-colors"
          >
            <span>View Project</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        )}
      </div>

      {/* Content Grid: Thumbnail on Left, Bullet Points on Right */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
        {/* Project Thumbnail */}
        <div className="sm:col-span-5 relative w-full aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden border border-line bg-[#09090C] flex items-center justify-center">
          {project?.media?.poster && project.media.poster !== "/projects/placeholder.webp" ? (
            <Image
              src={project.media.poster}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 220px"
              className="object-cover w-full h-full"
            />
          ) : (
            // Stylized Dark Cyber-Badge for Project
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <span className="font-display font-extrabold text-lg text-accent tracking-tight">
                {project ? project.title : tool.name}
              </span>
              <span className="font-mono text-[9px] text-muted-dim tracking-widest uppercase mt-0.5">
                {project ? project.category : "LAB EXPERIMENT"}
              </span>
            </div>
          )}
        </div>

        {/* Highlight Bullets with Mini Icons */}
        <div className="sm:col-span-7 flex flex-col gap-2">
          {highlights.slice(0, 3).map((item, idx) => {
            const IconComponent = bulletIcons[idx] || Sparkles;
            return (
              <div key={idx} className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5 text-accent">
                  <IconComponent className="h-3 w-3" />
                </span>
                <span className="font-sans text-[11px] sm:text-[11.5px] text-text/85 leading-snug">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
