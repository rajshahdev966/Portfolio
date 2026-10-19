import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers, Box, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";

const LAB_EXPERIMENTS = [
  {
    id: "3d-sticky-wall",
    title: "3D Sticky Wall",
    subtitle: "CSS 3D Transform Flip Cards",
    icon: Layers,
    description: "Algorithmic intuition recall cards running on pure GPU matrix rotations with zero animation library overhead.",
    tags: ["CSS 3D", "preserve-3d", "Zero JS Animation"],
  },
  {
    id: "dom-pool",
    title: "DOM Node Recycling",
    subtitle: "Tunnel Flap Engine Mechanics",
    icon: Box,
    description: "Interactive visualizer illustrating how cyclic 8-node DOM pooling prevents garbage collection stutter.",
    tags: ["Memory Management", "DOM Pool", "Game Physics"],
  },
  {
    id: "cursor-light",
    title: "Cursor-As-Light Shader",
    subtitle: "Interactive WebGL Fragment Physics",
    icon: Cpu,
    description: "Custom GLSL fragment shader illuminating surfaces with distance-attenuated lime point lighting.",
    tags: ["GLSL", "Fragment Shader", "WebGL"],
  },
];

export function LabTeaser() {
  return (
    <section
      aria-label="Interactive Lab Experiments"
      className="relative z-20 border-b border-line bg-[#0A0A0B] py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b border-line pb-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>[ 04 / 06 ] · EXPERIMENTAL LAB</span>
            </span>
            <h2 className="text-heading-2 text-text font-bold uppercase tracking-tight">
              Interactive Lab
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Button href="/lab" variant="outline" size="md" withArrow>
              Open Full Lab
            </Button>
          </div>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LAB_EXPERIMENTS.map((exp) => {
            const Icon = exp.icon;
            return (
              <Link
                key={exp.id}
                href="/lab"
                className="group flex flex-col justify-between rounded-[24px] border border-line bg-surface/40 p-8 transition-all hover:border-accent hover:bg-surface/80"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface text-accent group-hover:border-accent transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-accent group-hover:rotate-45 transition-all" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-text mb-1 group-hover:text-accent transition-colors">
                    {exp.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-dim block mb-4">
                    {exp.subtitle}
                  </span>

                  <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-line/60 flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] text-muted border border-line rounded px-2 py-0.5 bg-surface/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
