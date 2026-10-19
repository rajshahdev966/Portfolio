"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";
import { useScramble } from "@/hooks/useScramble";

// Dynamically import WebGL Canvas to keep initial bundle lightweight (<170KB)
const HeroDepthCanvas = dynamic(
  () => import("@/components/webgl/HeroDepthCanvas").then((mod) => mod.HeroDepthCanvas),
  { ssr: false }
);

export function Hero() {
  const { isCalm } = usePrefersCalm();
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [mouseShift, setMouseShift] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Scramble lines hook
  const { displayText: line1 } = useScramble(siteConfig.heroScrambleLines[0], { delay: 400 });
  const { displayText: line2 } = useScramble(siteConfig.heroScrambleLines[1], { delay: 650 });
  const { displayText: line3 } = useScramble(siteConfig.heroScrambleLines[2], { delay: 900 });

  // Mouse parallax interaction on letters (shifts up to 12px opposite cursor)
  useEffect(() => {
    if (isCalm || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;

      // Shift opposite to cursor
      setMouseShift({
        x: -deltaX * 12,
        y: -deltaY * 8,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isCalm]);

  return (
    <section
      ref={heroRef}
      aria-label="Introduction & Headline"
      className="relative flex min-h-[92vh] w-full flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 pb-12"
    >
      {/* Background Accent Mesh / Glow Refraction restricted inside */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full opacity-[0.06] blur-[120px]"
          style={{ background: "radial-gradient(circle, #C6FF3D 0%, #7B4DFF 100%)" }}
        />
      </div>

      {/* Top Meta Chips & Availability */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral" size="sm">
            {siteConfig.status}
          </Badge>
          <Badge variant="live" size="sm" dot>
            {siteConfig.availability}
          </Badge>
        </div>

        <span className="hidden sm:inline font-mono text-[11px] text-muted-dim tracking-wider">
          EST. 2026 · AHMEDABAD, INDIA
        </span>
      </div>

      {/* Middle Sandwich: Layer 1 (Name) + Layer 2 (Canvas/Image) + Layer 3 (Overlay) */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-6 sm:py-10">
        {/* Layer 1 (DOM): Giant Real-Text H1 "RAJ SHAH" */}
        <div
          className="relative z-10 w-full text-center select-none transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mouseShift.x}px, ${mouseShift.y}px, 0)`,
          }}
        >
          <h1
            ref={nameRef}
            className="text-hero-name tracking-tighter text-text/90 font-extrabold uppercase whitespace-nowrap"
          >
            RAJ SHAH
          </h1>
        </div>

        {/* Layer 2: 3D Depth Canvas (or Static CSS Parallax Cutout Fallback in Calm Mode) */}
        {!isCalm ? (
          <HeroDepthCanvas />
        ) : (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          >
            <div className="relative h-[480px] w-[360px] max-w-[85vw] opacity-90 transition-transform duration-300">
              <Image
                src="/hero/raj_shah_hero_image.png"
                alt="Raj Shah — Creative Product Engineer"
                fill
                priority
                sizes="(max-width: 768px) 300px, 480px"
                className="object-contain filter drop-shadow-[0_12px_36px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        )}

        {/* Layer 2.5: Atmospheric gradient overlay behind the foreground UI */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-25 h-36 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-transparent" />
      </div>

      {/* Layer 3 (DOM): Foreground Interactive UI & Statements */}
      <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-line/60 pt-6">
        {/* Left Column: => Scramble Statements (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-2 font-mono text-xs sm:text-sm text-text">
          <p className="flex items-center gap-2">
            <span className="text-accent font-bold">=&gt;</span>
            <span className="text-text/90">{line1}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-accent font-bold">=&gt;</span>
            <span className="text-text/90">{line2}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-accent font-bold">=&gt;</span>
            <span className="text-text/90">{line3}</span>
          </p>
        </div>

        {/* Right Column: Magnetic CTAs & Context (5 cols) */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-3.5">
          <Button
            href="/#work"
            variant="primary"
            size="md"
            withArrow
            data-cursor="view"
          >
            Explore selected work
          </Button>

          <Button
            href="/#contact"
            variant="secondary"
            size="md"
            withArrow
          >
            Have a project in mind?
          </Button>
        </div>
      </div>
    </section>
  );
}
