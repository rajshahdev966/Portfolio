"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// HeroName — renders both solid and outline layers from identical markup.
// Both layers share the same inset-0 absolute coordinate system so the
// outline mask aligns pixel-perfectly with the solid text.
// ---------------------------------------------------------------------------

interface HeroNameProps {
  isOutline?: boolean;
  strokeOpacity?: number;
}

function HeroName({ isOutline = false, strokeOpacity = 0.9 }: HeroNameProps) {
    const textStyle: React.CSSProperties = isOutline
    ? {
        color: "rgba(255, 255, 255, 0.10)",
        WebkitTextFillColor: "rgba(255, 255, 255, 0.66)",
        WebkitTextStroke: `1px rgba(0, 0, 0, 0.03)`,
        textShadow: "0 4px 24px rgba(255, 255, 255, 0.08)",
      }
    : { color: "#F4F4F0" };


  const commonClass =
    "inline-block font-display font-extrabold tracking-[-0.02em] leading-[0.82] text-[clamp(88px,23cqh,270px)]";

  return (
    <div
      aria-hidden={isOutline ? "true" : undefined}
      className={cn(
        "absolute inset-0 flex flex-col justify-center pointer-events-none select-none",
        isOutline ? "hero-outline-layer" : "hero-solid-layer"
      )}
    >
      {/* RAJ — upper-left */}
      <div className="flex w-full justify-start pl-[5%] sm:pl-[8%] lg:pl-[11%] -translate-y-[13cqh] sm:-translate-y-[15cqh] overflow-hidden">
        <span
          className={cn(commonClass, "animate-slide-in-left")}
          style={textStyle}
        >
          RAJ
        </span>
      </div>

      {/* SHAH — lower-right */}
      <div className="flex w-full justify-end pr-[5%] sm:pr-[8%] lg:pr-[10%] translate-y-[10cqh] sm:translate-y-[10cqh] overflow-hidden">
        <span
          className={cn(commonClass, "animate-slide-in-right")}
          style={textStyle}
        >
          SHAH
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MagneticWrapper — subtle cursor pull (disabled in calm mode / touch)
// ---------------------------------------------------------------------------

interface MagneticWrapperProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

function MagneticWrapper({ children, disabled, className }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    if (dist < 80) {
      setOffset({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 });
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 ? "transform 0.4s cubic-bezier(0.16,1,0.3,1)" : "none",
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Body anchor coordinates (percentages of the portrait box)
// Measured from 1122 x 1402 cutout:
// - CLASS: left collar/shoulder (x: 38.0%, y: 57.0%)
// - TRAIT: just right of glasses temple (x: 66.5%, y: 33.5%)
// - ABILITY: right shoulder (x: 73.0%, y: 63.0%)
// ---------------------------------------------------------------------------
const BODY_ANCHORS: Record<
  string,
  { xPct: number; yPct: number }
> = {
  "card-1": { xPct: 0.73, yPct: 0.61 },  // Right shoulder
  "card-2": { xPct: 0.30, yPct: 0.34 },  // Temple / side of head
  "card-3": { xPct: 0.34, yPct: 0.60 },  // Left shoulder
};

interface ConnectorLine {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

// ---------------------------------------------------------------------------
// Hero — main section
// ---------------------------------------------------------------------------

export function Hero() {
  const { isCalm } = usePrefersCalm();
  const heroRef = useRef<HTMLElement>(null);
  const portraitBoxRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLLIElement>(null);
  const card2Ref = useRef<HTMLLIElement>(null);
  const card3Ref = useRef<HTMLLIElement>(null);

  const lastScanTime = useRef<number>(0);
  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lock-on + scan states
  const [isLockedOn, setIsLockedOn] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);

  // Measured dynamic connectors
  const [connectors, setConnectors] = useState<ConnectorLine[]>([]);

  // Primary CTA ripple
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [primaryCoords, setPrimaryCoords] = useState({ x: 0, y: 0 });

  // Caption underline draw-in
  const [underlineDrawn, setUnderlineDrawn] = useState(false);

  // Kick underline animation after name entrance
  useEffect(() => {
    const t = setTimeout(() => setUnderlineDrawn(true), 700);
    return () => clearTimeout(t);
  }, []);

  // Cleanup scan timer on unmount
  useEffect(() => {
    return () => {
      if (scanTimer.current) clearTimeout(scanTimer.current);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Measured connector line calculation hook
  // ---------------------------------------------------------------------------
  const updateConnectors = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) {
      setConnectors([]);
      return;
    }

    const heroEl = heroRef.current;
    const portraitEl = portraitBoxRef.current;
    if (!heroEl || !portraitEl) return;

    const heroRect = heroEl.getBoundingClientRect();
    const portraitRect = portraitEl.getBoundingClientRect();

    const cardEntries = [
      { id: "card-1", el: card1Ref.current, anchor: BODY_ANCHORS["card-1"] },
      { id: "card-2", el: card2Ref.current, anchor: BODY_ANCHORS["card-2"] },
      { id: "card-3", el: card3Ref.current, anchor: BODY_ANCHORS["card-3"] },
    ];

    const computed: ConnectorLine[] = [];

    for (const { id, el, anchor } of cardEntries) {
      if (!el) continue;
      const cardRect = el.getBoundingClientRect();

      // Body anchor in hero-relative pixel coordinates
      const endX = portraitRect.left - heroRect.left + portraitRect.width * anchor.xPct;
      const endY = portraitRect.top - heroRect.top + portraitRect.height * anchor.yPct;

      // 4 edge midpoints of the card in hero-relative pixel coordinates
      const midpoints = [
        // Left edge midpoint
        { x: cardRect.left - heroRect.left, y: cardRect.top - heroRect.top + cardRect.height / 2 },
        // Right edge midpoint
        { x: cardRect.right - heroRect.left, y: cardRect.top - heroRect.top + cardRect.height / 2 },
        // Top edge midpoint
        { x: cardRect.left - heroRect.left + cardRect.width / 2, y: cardRect.top - heroRect.top },
        // Bottom edge midpoint
        { x: cardRect.left - heroRect.left + cardRect.width / 2, y: cardRect.bottom - heroRect.top },
      ];

      // Find nearest edge midpoint to the body anchor
      let best = midpoints[0];
      let bestDist = Infinity;
      for (const pt of midpoints) {
        const d = Math.hypot(pt.x - endX, pt.y - endY);
        if (d < bestDist) {
          bestDist = d;
          best = pt;
        }
      }

      computed.push({
        id,
        startX: best.x,
        startY: best.y,
        endX,
        endY,
      });
    }

    setConnectors(computed);
  }, []);

  useEffect(() => {
    updateConnectors();

    const observer = new ResizeObserver(() => {
      updateConnectors();
    });

    if (heroRef.current) observer.observe(heroRef.current);
    if (portraitBoxRef.current) observer.observe(portraitBoxRef.current);
    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);
    if (card3Ref.current) observer.observe(card3Ref.current);

    window.addEventListener("resize", updateConnectors);

    // Re-run after custom fonts finish loading
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        updateConnectors();
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateConnectors);
    };
  }, [updateConnectors]);

  // ---------------------------------------------------------------------------
  // Scan helpers
  // ---------------------------------------------------------------------------

  const triggerScan = () => {
    const now = Date.now();
    if (now - lastScanTime.current <= 1500 || isCalm) return;
    lastScanTime.current = now;
    setScanActive(true);
    if (scanTimer.current) clearTimeout(scanTimer.current);
    scanTimer.current = setTimeout(() => {
      setScanActive(false);
      scanTimer.current = null;
    }, 700);
  };

  const handlePortraitEnter = () => {
    setIsLockedOn(true);
    triggerScan();
  };

  const handlePortraitLeave = () => {
    setIsLockedOn(false);
    setScanActive(false);
    if (scanTimer.current) {
      clearTimeout(scanTimer.current);
      scanTimer.current = null;
    }
  };

  const handlePortraitClick = () => {
    setIsLockedOn((prev) => !prev);
    triggerScan();
  };

  // Primary button ripple
  const handlePrimaryMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPrimaryCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setPrimaryHovered(true);
  };

  const handlePrimaryMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPrimaryCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // ---------------------------------------------------------------------------
  // Shared portrait box styling
  // Centred horizontally, bottom-anchored, aspect-ratio matching cutout (1122 / 1402)
  // height: min(106cqh, calc(96cqw * 1402 / 1122))
  // ---------------------------------------------------------------------------
  const sharedPortraitBoxStyle: React.CSSProperties = {
    height: "min(106cqh, calc(96cqw * 1402 / 1122))",
    aspectRatio: "1122 / 1402",
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Introduction and Hero Stage"
      className="relative w-full h-[95svh] min-h-[640px] overflow-hidden flex flex-col justify-end items-center [container-type:size] select-none"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(198,255,61,0.05) 0%, #0A0A0B 100%)",
      }}
    >
      {/* ================================================================ */}
      {/* LAYER 1 — Solid name h1 (behind portrait)                       */}
      {/* ================================================================ */}
      <h1 className="sr-only">Raj Shah</h1>
      <div className="absolute inset-0 z-10">
        <HeroName />
      </div>

      {/* ================================================================ */}
      {/* LAYER 2 — Static portrait + bottom fade                         */}
      {/* Shared portrait box: centered horizontally, bottom-anchored     */}
      {/* ================================================================ */}
      <div
        ref={portraitBoxRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4cqh] left-1/2 -translate-x-1/2 z-20"
        style={sharedPortraitBoxStyle}
      >
        <div className="relative w-full h-full">
          <Image
            src="/hero/raj_shah_hero_image.png"
            alt="Portrait of Raj Shah"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 96vw, (max-width: 1440px) 840px, 920px"
            className="object-fill drop-shadow-[0_0_18px_rgba(198,255,61,0.12)]"
          />
          {/* Bottom-edge fade into #0A0A0B */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-[22] h-32 sm:h-40 pointer-events-none bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent"
          />
        </div>
      </div>

      {/* ================================================================ */}
      {/* LAYER 3 — Outlined name, masked to portrait alpha               */}
      {/* Uses identical shared portrait box geometry for pixel-perfect  */}
      {/* coordinate matching with Layer 2 and Layer 1.                   */}
      {/* ================================================================ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4cqh] left-1/2 -translate-x-1/2 z-[25]"
        style={sharedPortraitBoxStyle}
      >
        <div
          className="relative w-full h-full"
          style={{
            WebkitMaskImage: "url('/hero/raj_shah_hero_image.png')",
            maskImage: "url('/hero/raj_shah_hero_image.png')",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskPosition: "center bottom",
            maskPosition: "center bottom",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          {/*
           * Outline name frame: spans the full hero size (100cqw × 100cqh).
           * left-1/2 -ml-[50cqw] aligns its left edge with hero left edge.
           * bottom-[4cqh] un-shifts the bottom-[-4cqh] anchor.
           */}
          <div className="absolute left-1/2 -ml-[50cqw] bottom-[4cqh] w-[100cqw] h-[100cqh]">
            <HeroName isOutline strokeOpacity={isLockedOn ? 1 : 0.9} />
          </div>

          {/* Sweeping lime scan line (masked to portrait) */}
          {scanActive && !isCalm && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[2px] animate-scanline bg-accent shadow-[0_0_24px_4px_#C6FF3D]"
            />
          )}
        </div>
      </div>

      {/* ================================================================ */}
      {/* LAYER 4 — Interactive portrait hover zone + face reticle (HUD)   */}
      {/* Uses identical shared portrait box geometry                     */}
      {/* ================================================================ */}
      <div
        aria-label="Interactive Portrait Stage"
        role="region"
        className="pointer-events-none absolute bottom-[-4cqh] left-1/2 -translate-x-1/2 z-[28]"
        style={sharedPortraitBoxStyle}
      >
        <div
          className="pointer-events-auto relative w-full h-full cursor-crosshair"
          onPointerEnter={handlePortraitEnter}
          onPointerLeave={handlePortraitLeave}
          onClick={handlePortraitClick}
        >
          {/* Face corner reticle brackets */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-1/2 -translate-x-1/2 top-[18%] w-[42%] h-[32%] transition-all duration-200 ease-out",
              isLockedOn
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[1.15] pointer-events-none"
            )}
          >
            <span className="absolute top-0 left-0 w-4 sm:w-5 h-4 sm:h-5 border-t-[1.5px] border-l-[1.5px] border-accent" />
            <span className="absolute top-0 right-0 w-4 sm:w-5 h-4 sm:h-5 border-t-[1.5px] border-r-[1.5px] border-accent" />
            <span className="absolute bottom-0 left-0 w-4 sm:w-5 h-4 sm:h-5 border-b-[1.5px] border-l-[1.5px] border-accent" />
            <span className="absolute bottom-0 right-0 w-4 sm:w-5 h-4 sm:h-5 border-b-[1.5px] border-r-[1.5px] border-accent" />
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* LAYER 5 — Strength cards + dynamic measured connector lines      */}
      {/* ================================================================ */}
      <div className="pointer-events-none absolute inset-0 z-[27]">
        {/* Dynamic SVG connector lines (hidden below 768px) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full text-accent overflow-visible hidden md:block"
        >
          {connectors.map((c) => (
            <g key={c.id}>
              {/* Dashed connector line */}
              <line
                x1={c.startX}
                y1={c.startY}
                x2={c.endX}
                y2={c.endY}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                className={cn(
                  "transition-opacity duration-300",
                  focusedCardId === c.id
                    ? "opacity-100"
                    : focusedCardId
                    ? "opacity-30"
                    : isLockedOn
                    ? "opacity-80"
                    : "opacity-40"
                )}
              />
              {/* Node dot on body anchor point */}
              <circle
                cx={c.endX}
                cy={c.endY}
                r="3.5"
                className={cn(
                  "fill-accent transition-all duration-300",
                  focusedCardId === c.id
                    ? "opacity-100"
                    : focusedCardId
                    ? "opacity-40"
                    : isLockedOn
                    ? "opacity-90"
                    : "opacity-70"
                )}
              />
              {/* Node dot at card edge midpoint */}
              <circle
                cx={c.startX}
                cy={c.startY}
                r="2.5"
                className={cn(
                  "fill-accent transition-all duration-300",
                  focusedCardId === c.id
                    ? "opacity-100"
                    : focusedCardId
                    ? "opacity-40"
                    : isLockedOn
                    ? "opacity-90"
                    : "opacity-70"
                )}
              />
            </g>
          ))}
        </svg>

        {/* Strength cards */}
        <ul aria-label="Core Engineering Strengths" className="contents">
          {/* Card 1: CLASS */}
          <li
            ref={card1Ref}
            tabIndex={0}
            onFocus={() => setFocusedCardId("card-1")}
            onBlur={() => setFocusedCardId(null)}
            onMouseEnter={() => setFocusedCardId("card-1")}
            onMouseLeave={() => setFocusedCardId(null)}
            className={cn(
              "hero-card-1 pointer-events-auto absolute z-30",
              "w-[145px] sm:w-[210px] md:w-[240px] p-2.5 sm:p-3 rounded-[4px] corner-ticks bg-[#131316]/80 backdrop-blur-md border",
              "transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
              focusedCardId === "card-1"
                ? "border-accent/80 shadow-[0_0_16px_rgba(198,255,61,0.2)]"
                : focusedCardId ? "border-white/10 opacity-50"
                : isLockedOn ? "border-accent/60"
                : "border-white/[0.12]"
            )}
          >
            <span className="block font-mono text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wider text-accent uppercase">
              {siteConfig.heroStrengthCards[0].label}
            </span>
            <p className="mt-0.5 sm:mt-1 font-sans text-[12px] sm:text-[13px] md:text-[14px] font-medium text-[#F4F4F0]/90 leading-tight">
              {siteConfig.heroStrengthCards[0].text}
            </p>
          </li>

          {/* Card 2: TRAIT */}
          <li
            ref={card2Ref}
            tabIndex={0}
            onFocus={() => setFocusedCardId("card-2")}
            onBlur={() => setFocusedCardId(null)}
            onMouseEnter={() => setFocusedCardId("card-2")}
            onMouseLeave={() => setFocusedCardId(null)}
            className={cn(
              "hero-card-2 pointer-events-auto absolute z-30",
              "w-[145px] sm:w-[210px] md:w-[240px] p-2.5 sm:p-3 rounded-[4px] corner-ticks bg-[#131316]/80 backdrop-blur-md border",
              "transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
              focusedCardId === "card-2"
                ? "border-accent/80 shadow-[0_0_16px_rgba(198,255,61,0.2)]"
                : focusedCardId ? "border-white/10 opacity-50"
                : isLockedOn ? "border-accent/60"
                : "border-white/[0.12]"
            )}
          >
            <span className="block font-mono text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wider text-accent uppercase">
              {siteConfig.heroStrengthCards[1].label}
            </span>
            <p className="mt-0.5 sm:mt-1 font-sans text-[12px] sm:text-[13px] md:text-[14px] font-medium text-[#F4F4F0]/90 leading-tight">
              {siteConfig.heroStrengthCards[1].text}
            </p>
          </li>

          {/* Card 3: ABILITY */}
          <li
            ref={card3Ref}
            tabIndex={0}
            onFocus={() => setFocusedCardId("card-3")}
            onBlur={() => setFocusedCardId(null)}
            onMouseEnter={() => setFocusedCardId("card-3")}
            onMouseLeave={() => setFocusedCardId(null)}
            className={cn(
              "hero-card-3 pointer-events-auto absolute z-30",
              "w-[145px] sm:w-[210px] md:w-[240px] p-2.5 sm:p-3 rounded-[4px] corner-ticks bg-[#131316]/80 backdrop-blur-md border",
              "transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
              focusedCardId === "card-3"
                ? "border-accent/80 shadow-[0_0_16px_rgba(198,255,61,0.2)]"
                : focusedCardId ? "border-white/10 opacity-50"
                : isLockedOn ? "border-accent/60"
                : "border-white/[0.12]"
            )}
          >
            <span className="block font-mono text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wider text-accent uppercase">
              {siteConfig.heroStrengthCards[2].label}
            </span>
            <p className="mt-0.5 sm:mt-1 font-sans text-[12px] sm:text-[13px] md:text-[14px] font-medium text-[#F4F4F0]/90 leading-tight">
              {siteConfig.heroStrengthCards[2].text}
            </p>
          </li>
        </ul>
      </div>

      {/* ================================================================ */}
      {/* LAYER 6 — Bottom caption + CTAs (absolute, over portrait fade)   */}
      {/* At least 32px bottom clearance                                  */}
      {/* ================================================================ */}
      <div className="pointer-events-none absolute bottom-8 sm:bottom-8 lg:bottom-10 inset-x-0 z-30 w-full px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 sm:gap-6">

        {/* Caption */}
        <div className="pointer-events-auto flex flex-col items-center md:items-start select-none">
          <p className="font-serif italic text-[#F4F4F0] text-[clamp(24px,3.1cqw,52px)] leading-[1.08] tracking-tight text-center md:text-left">
            <span>{siteConfig.heroCaption.line1}</span>
            <br />
            <span className="text-accent relative inline-block">
              {siteConfig.heroCaption.line2}
              <svg
                viewBox="0 0 200 14"
                fill="none"
                aria-hidden="true"
                className="absolute left-0 -bottom-1.5 w-full h-2.5 overflow-visible text-accent"
              >
                <path
                  d="M 3 8 Q 50 2, 100 7 T 197 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 210,
                    strokeDashoffset: underlineDrawn ? 0 : 210,
                    transition: "stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </svg>
            </span>
          </p>
        </div>

        {/* CTAs */}
        <div className="pointer-events-auto flex justify-center items-center">
          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4">

            {/* Primary — Keycap pill */}
            <MagneticWrapper disabled={isCalm}>
              <Link
                href={siteConfig.heroCtas.primary.href}
                onMouseEnter={handlePrimaryMouseEnter}
                onMouseMove={handlePrimaryMouseMove}
                onMouseLeave={() => setPrimaryHovered(false)}
                className="group relative inline-flex items-center justify-center gap-3 h-12 px-7 rounded-full bg-accent text-[#0A0A0B] font-sans font-semibold text-sm tracking-wide btn-keycap overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] cursor-pointer"
              >
                {/* Ripple */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-[#D4FF66] transition-[clip-path] duration-500 ease-out"
                  style={{
                    clipPath: primaryHovered
                      ? `circle(160% at ${primaryCoords.x}px ${primaryCoords.y}px)`
                      : `circle(0% at ${primaryCoords.x}px ${primaryCoords.y}px)`,
                  }}
                />
                {/* Text roll */}
                <span className="relative z-10 block overflow-hidden h-[20px] leading-[20px]">
                  <span className="block transition-transform duration-[350ms] ease-out group-hover:-translate-y-[20px]">
                    <span className="block h-[20px] leading-[20px] text-[#0A0A0B] font-sans font-semibold text-sm whitespace-nowrap">
                      {siteConfig.heroCtas.primary.text}
                    </span>
                    <span aria-hidden="true" className="block h-[20px] leading-[20px] text-[#0A0A0B] font-sans font-semibold text-sm whitespace-nowrap">
                      {siteConfig.heroCtas.primary.text}
                    </span>
                  </span>
                </span>
                {/* Arrow */}
                <span aria-hidden="true" className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#0A0A0B] text-accent transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </MagneticWrapper>

            {/* Secondary — Ghost conic-glow pill */}
            <MagneticWrapper disabled={isCalm}>
              <Link
                href={siteConfig.heroCtas.secondary.href}
                className="group relative inline-flex items-center justify-center h-12 px-6 rounded-full border border-line bg-[#131316]/70 backdrop-blur-md text-[#F4F4F0] font-sans font-medium text-sm conic-border-glow hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] cursor-pointer"
              >
                <span className="relative block overflow-hidden h-[20px] leading-[20px]">
                  <span className="block transition-transform duration-[350ms] ease-out group-hover:-translate-y-[20px]">
                    <span className="block h-[20px] leading-[20px] text-[#F4F4F0] font-sans font-medium text-sm whitespace-nowrap">
                      {siteConfig.heroCtas.secondary.text}
                    </span>
                    <span aria-hidden="true" className="block h-[20px] leading-[20px] text-accent font-sans font-medium text-sm whitespace-nowrap">
                      {siteConfig.heroCtas.secondary.hoverText}
                    </span>
                  </span>
                </span>
              </Link>
            </MagneticWrapper>
          </div>
        </div>

        {/* Spacer for desktop 3-column balance */}
        <div className="hidden md:block w-[140px] lg:w-[200px]" aria-hidden="true" />
      </div>
    </section>
  );
}
