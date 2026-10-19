import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { archiveProjects } from "@/content/projects";
import { Badge } from "@/components/ui/Badge";

export function ProjectArchive() {
  return (
    <div className="mt-20 pt-16 border-t border-line">
      {/* Archive Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            [ ARCHIVE ] · ADDITIONAL EXPLORATIONS
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-text mt-1">
            Project Archive
          </h3>
        </div>
        <span className="font-mono text-xs text-muted">
          Showing {archiveProjects.length} documented technical builds
        </span>
      </div>

      {/* Responsive Table / Card Container */}
      <div className="overflow-x-auto rounded-[20px] border border-line bg-surface/30">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line bg-surface/60 font-mono text-[11px] uppercase tracking-wider text-muted">
              <th className="py-4 px-6 font-semibold">Project</th>
              <th className="py-4 px-6 font-semibold hidden sm:table-cell">Intent Tag</th>
              <th className="py-4 px-6 font-semibold hidden md:table-cell">Stack</th>
              <th className="py-4 px-6 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60 font-sans text-xs">
            {archiveProjects.map((project) => (
              <tr
                key={project.slug}
                className="group hover:bg-surface-elevated/50 transition-colors"
              >
                {/* Title & Subtitle */}
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <Link
                      href={`/work/${project.slug}`}
                      className="font-display text-base font-bold text-text group-hover:text-accent transition-colors"
                    >
                      {project.title}
                    </Link>
                    <span className="font-sans text-xs text-muted line-clamp-1">
                      {project.subtitle}
                    </span>
                  </div>
                </td>

                {/* Intent Tag */}
                <td className="py-4 px-6 hidden sm:table-cell">
                  <span className="font-mono text-[11px] text-accent/90">
                    {project.category}
                  </span>
                </td>

                {/* Stack */}
                <td className="py-4 px-6 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-muted border border-line rounded px-2 py-0.5 bg-surface/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6 whitespace-nowrap">
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
                </td>

                {/* Action Link */}
                <td className="py-4 px-6 text-right whitespace-nowrap">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-accent font-semibold transition-colors"
                  >
                    <span>View</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
