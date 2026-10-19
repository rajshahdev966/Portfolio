"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCw, Sparkles, Box, Layers, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Interactive Demo 1: 3D Sticky Wall Cards
function StickyWallDemo() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const cards = [
    {
      concept: "Two Pointers / Fast & Slow",
      intuition: "Detecting cycles in linked lists or finding midpoints in O(1) extra auxiliary space.",
      code: "while (fast != null && fast.next != null) {\n  slow = slow.next;\n  fast = fast.next.next;\n  if (slow == fast) return true;\n}",
    },
    {
      concept: "Sliding Window Maximum",
      intuition: "Monotonic deque preserving decreasing order so the maximum is always at the front.",
      code: "Deque<Integer> q = new ArrayDeque<>();\nwhile (!q.isEmpty() && nums[q.peekLast()] <= val) {\n  q.pollLast();\n}\nq.offerLast(i);",
    },
    {
      concept: "Binary Search On Answer",
      intuition: "When the decision function f(x) is monotonic, search across the answer space [low, high].",
      code: "while (low <= high) {\n  int mid = low + (high - low) / 2;\n  if (isValid(mid)) { ans = mid; high = mid - 1; }\n  else { low = mid + 1; }\n}",
    },
  ];

  return (
    <div className="flex flex-col gap-6 rounded-[24px] border border-line bg-surface/50 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/60 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
            <Layers className="h-3.5 w-3.5" />
            <span>DEMO 01 · 3D STICKY WALL</span>
          </span>
          <h3 className="font-display text-xl font-bold text-text mt-1">
            Pure CSS 3D Algorithmic Flip Cards
          </h3>
        </div>
        <p className="font-mono text-xs text-muted-dim">
          What this shows: GPU-accelerated preserve-3d rotations with zero JS animation libraries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, idx) => {
          const isCardFlipped = Boolean(flipped[idx]);
          return (
            <div
              key={idx}
              onClick={() => toggleCard(idx)}
              className="relative h-64 w-full cursor-pointer select-none [perspective:1000px]"
            >
              <div
                className={`relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
                  isCardFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Front Face: Concept & Intuition */}
                <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-line bg-surface-elevated p-6 [backface-visibility:hidden] shadow-md">
                  <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-2">
                      CONCEPT {idx + 1}
                    </span>
                    <h4 className="font-display text-lg font-bold text-text mb-2">
                      {c.concept}
                    </h4>
                    <p className="font-sans text-xs text-muted leading-relaxed">
                      {c.intuition}
                    </p>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-muted-dim pt-4 border-t border-line/40">
                    <span>Click or tap to flip</span>
                    <RotateCw className="h-3.5 w-3.5 text-accent" />
                  </div>
                </div>

                {/* Reverse Face: Clean Code Snippet */}
                <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-accent/40 bg-[#0A0A0B] p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xl">
                  <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-2">
                      JAVA IMPLEMENTATION
                    </span>
                    <pre className="font-mono text-[11px] text-text/90 leading-relaxed overflow-x-auto p-2 rounded bg-surface border border-line">
                      <code>{c.code}</code>
                    </pre>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-muted-dim pt-2">
                    <span>Click to return</span>
                    <RotateCw className="h-3.5 w-3.5 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Interactive Demo 2: DOM Pooling Simulator (Tunnel Flap Mechanics)
function DomPoolingSimulator() {
  const [activePoolSize] = useState(8);
  const [cycledCount, setCycledCount] = useState(24);
  const [isSimulating, setIsSimulating] = useState(true);

  return (
    <div className="flex flex-col gap-6 rounded-[24px] border border-line bg-surface/50 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/60 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
            <Box className="h-3.5 w-3.5" />
            <span>DEMO 02 · DOM OBJECT POOLING</span>
          </span>
          <h3 className="font-display text-xl font-bold text-text mt-1">
            Tunnel Flap Memory Lifecycle Simulator
          </h3>
        </div>
        <p className="font-mono text-xs text-muted-dim">
          What this shows: Recycling 8 persistent DOM nodes eliminates garbage collection stutter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative h-44 w-full rounded-2xl border border-line bg-[#0A0A0B] p-4 overflow-hidden flex items-center justify-around">
            {/* Visualizer showing 8 recycled slots */}
            {Array.from({ length: activePoolSize }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-2"
              >
                <div
                  className={`h-24 w-7 rounded-lg border transition-all duration-300 flex items-center justify-center font-mono text-[10px] font-bold ${
                    i === (cycledCount % activePoolSize)
                      ? "border-accent bg-accent/20 text-accent scale-110 shadow-[0_0_12px_#C6FF3D]"
                      : "border-line bg-surface text-muted"
                  }`}
                >
                  N{i + 1}
                </div>
                <span className="font-mono text-[9px] text-muted-dim">slot</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between font-mono text-xs text-muted">
            <span>Nodes Recycled: <strong className="text-accent">{cycledCount} cycles</strong></span>
            <span>DOM Allocation: <strong className="text-text">Constant 8 Nodes (Zero Leak)</strong></span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3 rounded-xl border border-line bg-surface p-5">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            Engine Rule
          </span>
          <p className="font-sans text-xs text-muted leading-relaxed">
            Instead of calling <code>document.createElement()</code> and <code>element.remove()</code>, obstacles that pass the left boundary simply transform their X coordinate back to the right with randomized gap geometry.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCycledCount((prev) => prev + 8)}
            className="mt-2"
          >
            Trigger 8 Cycles
          </Button>
        </div>
      </div>
    </div>
  );
}

// Interactive Demo 3: Interactive Pointer Tilt Card
function PointerTiltDemo() {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30; // -15 to +15 deg
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 30;
    setTilt({ x: y, y: x });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col gap-6 rounded-[24px] border border-line bg-surface/50 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/60 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5" />
            <span>DEMO 03 · SPATIAL POINTER TILT</span>
          </span>
          <h3 className="font-display text-xl font-bold text-text mt-1">
            Interactive Physics Perspective Card
          </h3>
        </div>
        <p className="font-mono text-xs text-muted-dim">
          What this shows: Real-time pointer vector calculations mapped to 3D matrix perspective.
        </p>
      </div>

      <div className="flex items-center justify-center py-8 [perspective:1200px]">
        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.15s ease-out",
          }}
          className="relative h-72 w-full max-w-md rounded-2xl border border-line bg-gradient-to-br from-surface-elevated via-surface to-[#0A0A0B] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] [transform-style:preserve-3d] select-none flex flex-col justify-between"
        >
          {/* Glowing rim accent */}
          <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-accent animate-ping" />

          <div style={{ transform: "translateZ(30px)" }}>
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-2">
              PHYSICS EXPERIMENT
            </span>
            <h4 className="font-display text-2xl font-bold text-text">
              Obsidian Lime Spatial Tile
            </h4>
            <p className="font-sans text-xs text-muted mt-2 leading-relaxed">
              Hover and move your pointer across this card to observe real-time angular displacement without layout thrashing.
            </p>
          </div>

          <div
            style={{ transform: "translateZ(45px)" }}
            className="flex items-center justify-between font-mono text-[10px] text-muted-dim pt-4 border-t border-line/50"
          >
            <span>rotateX: {tilt.x.toFixed(1)}°</span>
            <span>rotateY: {tilt.y.toFixed(1)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LabPage() {
  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="border-b border-line pb-12 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE DIGITAL WORKSHOP</span>
            </span>
            <Badge variant="experiment" size="sm">
              Live Experiments
            </Badge>
          </div>

          <h1 className="text-heading-1 font-bold uppercase tracking-tight text-text mb-4">
            Interactive Lab
          </h1>

          <p className="font-sans text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
            A sandbox for creative frontend prototypes, low-level browser mechanics experiments, and tactile interaction design tests built by Raj Shah.
          </p>
        </header>

        {/* The 3 Interactive Demos */}
        <div className="flex flex-col gap-12">
          <StickyWallDemo />
          <DomPoolingSimulator />
          <PointerTiltDemo />
        </div>
      </div>
    </div>
  );
}
