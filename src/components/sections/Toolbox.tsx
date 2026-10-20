"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Info } from "lucide-react";

interface ToolItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "architecture" | "learning";
  usedIn: string;
  isLearning?: boolean;
}

const TOOLS: ToolItem[] = [
  { id: "nextjs", name: "Next.js (App Router)", category: "frontend", usedIn: "ARC, Portfolio" },
  { id: "react", name: "React 19 / 18", category: "frontend", usedIn: "DEVIntel, SceneVault" },
  { id: "tailwind", name: "Tailwind CSS v4", category: "frontend", usedIn: "ARC, DEVIntel, Portfolio" },
  { id: "javascript", name: "JavaScript (ES6+)", category: "frontend", usedIn: "Tunnel Flap, FinTrack, Brewnest" },
  { id: "htmlcss", name: "Semantic HTML5 / CSS3", category: "frontend", usedIn: "GHAR, UrbanNest, Brewnest" },
  { id: "redux", name: "Redux Toolkit", category: "architecture", usedIn: "DEVIntel (FSD State)" },
  { id: "rest", name: "REST APIs & Polling", category: "architecture", usedIn: "DEVIntel, SceneVault" },
  { id: "firebase", name: "Firebase / Firestore", category: "backend", usedIn: "Alchemy Stories (Serverless)" },
  { id: "apps-script", name: "Google Apps Script", category: "backend", usedIn: "Brewnest ($0 Reservation Flow)" },
  { id: "git", name: "Git / GitHub", category: "architecture", usedIn: "All Projects & FSD Versioning" },
  { id: "sql", name: "SQL & Relational Logic", category: "backend", usedIn: "Database Modeling & Queries" },
  { id: "node", name: "Node.js & Express", category: "backend", usedIn: "Local tooling & API contracts" },
  { id: "java-dsa", name: "Java (DSA Algorithms)", category: "learning", usedIn: "Deliberate university practice & ARC", isLearning: true },
  { id: "devops", name: "DevOps & CI/CD Pipelines", category: "learning", usedIn: "Currently exploring deployment automation", isLearning: true },
];

export function Toolbox() {
  const { isCalm } = usePrefersCalm();
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matter.js dynamic physics integration (on desktop non-calm devices)
  useEffect(() => {
    if (isCalm || window.matchMedia("(max-width: 1024px)").matches) return;

    let engineInstance: any;
    let renderInstance: any;
    let runnerInstance: any;

    const initPhysics = async () => {
      const Matter = await import("matter-js");
      const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter.default || Matter;

      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const width = container.clientWidth;
      const height = 480;

      const engine = Engine.create({
        gravity: { x: 0, y: 0.9, scale: 0.001 },
      });
      engineInstance = engine;

      const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          width: width,
          height: height,
          background: "transparent",
          wireframes: false,
        },
      });
      renderInstance = render;

      // Walls
      const wallThickness = 60;
      const floor = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true });
      const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true });
      const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true });

      // Create chips
      const chipBodies = TOOLS.map((tool, idx) => {
        const chipWidth = tool.name.length * 10 + 40;
        const chipHeight = 44;
        const startX = 60 + (idx % 6) * 120 + (Math.random() * 20 - 10);
        const startY = -40 - idx * 25;

        const body = Bodies.rectangle(startX, startY, chipWidth, chipHeight, {
          chamfer: { radius: 20 },
          restitution: 0.5,
          friction: 0.2,
          render: {
            fillStyle: tool.isLearning ? "#18181D" : "#131316",
            strokeStyle: tool.isLearning ? "#8A8A93" : "#26262B",
            lineWidth: tool.isLearning ? 1.5 : 1,
          },
        });
        (body as any).toolData = tool;
        return body;
      });

      Composite.add(engine.world, [floor, leftWall, rightWall, ...chipBodies]);

      // Mouse control & drag
      const mouse = Mouse.create(canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });
      Composite.add(engine.world, mouseConstraint);

      // Runner
      const runner = Runner.create();
      runnerInstance = runner;
      Runner.run(runner, engine);
      Render.run(render);

      // Custom text rendering on top of physics bodies
      Matter.Events.on(render, "afterRender", () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        chipBodies.forEach((body) => {
          const tool = (body as any).toolData as ToolItem;
          if (!tool) return;

          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);

          ctx.font = "600 12px 'JetBrains Mono', monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          ctx.fillStyle = tool.isLearning ? "#F59E0B" : "#F4F4F0";
          ctx.fillText(tool.name, 0, 0);

          ctx.restore();
        });
      });

      // Click detection on physics chips
      Matter.Events.on(mouseConstraint, "mousedown", (event: any) => {
        const mousePosition = event.mouse.position;
        const clickedBodies = Matter.Query.point(chipBodies, mousePosition);
        if (clickedBodies.length > 0) {
          const body = clickedBodies[0] as any;
          if (body.toolData) {
            setSelectedTool(body.toolData);
          }
        }
      });
    };

    initPhysics();

    return () => {
      if (runnerInstance && engineInstance) {
        import("matter-js").then((Matter) => {
          const { Runner, Render, Composite } = Matter.default || Matter;
          Runner.stop(runnerInstance);
          Render.stop(renderInstance);
          Composite.clear(engineInstance.world, false);
        });
      }
    };
  }, [isCalm]);

  return (
    <section
      aria-label="Technical Toolbox"
      className="relative z-20 border-b border-line bg-surface/30 py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b border-line pb-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              [ 03 / 06 ] · TECHNICAL STACK
            </span>
            <h2 className="text-heading-2 text-text font-bold uppercase tracking-tight">
              Toolbox
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-muted max-w-md leading-relaxed">
            Only evidenced tools tied to real shipping projects. Learning areas are explicitly marked.
          </p>
        </div>

        {/* Selected Tool Details Banner */}
        {selectedTool && (
          <div className="mb-8 rounded-2xl border border-accent/40 bg-surface-elevated p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(198,255,61,0.15)]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-[#0A0A0B] font-mono font-bold text-sm">
                RS
              </span>
              <div>
                <h4 className="font-display text-lg font-bold text-text">
                  {selectedTool.name}
                </h4>
                <p className="font-sans text-xs text-muted">
                  Used in: <strong className="text-accent">{selectedTool.usedIn}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedTool(null)}
              className="font-mono text-[11px] uppercase tracking-wider text-muted hover:text-text"
            >
              Close
            </button>
          </div>
        )}

        {/* Physics Canvas for Desktop / Interactive Mode */}
        {!isCalm && (
          <div
            ref={containerRef}
            className="hidden lg:block relative h-[480px] w-full rounded-[24px] border border-line bg-surface/40 overflow-hidden"
            data-cursor="drag"
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="pointer-events-none absolute bottom-4 left-6 flex items-center gap-2 font-mono text-[11px] text-muted">
              <Info className="h-3.5 w-3.5 text-accent" />
              <span>Interactive physics enabled. Click or drag chips to inspect project ties.</span>
            </div>
          </div>
        )}

        {/* Static Accessible Grid for Mobile or Calm Mode */}
        <div
          className={`${
            !isCalm ? "lg:hidden" : ""
          } grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}
        >
          {TOOLS.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className={`flex flex-col justify-between rounded-xl border p-5 cursor-pointer transition-all hover:border-accent ${
                tool.isLearning
                  ? "border-dashed border-line bg-surface/30"
                  : "border-line bg-surface/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-display text-base font-bold text-text">
                  {tool.name}
                </span>
                {tool.isLearning ? (
                  <span className="font-mono text-[10px] uppercase text-amber-400 border border-amber-400/30 rounded px-2 py-0.5 bg-amber-400/10">
                    Learning
                  </span>
                ) : (
                  <span className="font-mono text-[10px] uppercase text-muted-dim">
                    {tool.category}
                  </span>
                )}
              </div>

              <div className="font-sans text-xs text-muted flex items-center gap-1.5 pt-2 border-t border-line/40">
                <span className="text-accent text-[10px] font-mono">USED IN:</span>
                <span className="text-text/80 font-medium">{tool.usedIn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
