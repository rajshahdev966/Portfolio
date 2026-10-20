"use client";

import React, { useRef, useEffect, useState, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";
import { cn } from "@/lib/utils";

/**
 * HeroName renders the display name "RAJ SHAH" in two staggered lines.
 * Both the solid underlying layer and the top masked outline layer share
 * this identical markup and CSS hierarchy to guarantee pixel-perfect alignment.
 */
interface HeroNameProps {
  isOutline?: boolean;
  strokeOpacity?: number;
}

function HeroName({ isOutline = false, strokeOpacity = 0.9 }: HeroNameProps) {
  if (isOutline) {
    return (
      <div
        aria-hidden="true"
        className="hero-outline-layer absolute inset-0 flex flex-col justify-center pointer-events-none select-none"
      >
        <div className="w-full flex justify-start pl-[5%] sm:pl-[8%] lg:pl-[11%] -translate-y-[13cqh] sm:-translate-y-[15cqh]">
          <span
            className="inline-block font-display font-extrabold tracking-[-0.02em] leading-[0.82] text-[#F4F4F0] text-[clamp(88px,23cqh,270px)] hero-outline-text"
            style={{
              WebkitTextStroke: `1px rgba(255, 255, 255, ${strokeOpacity})`,
            }}
          >
            RAJ
          </span>
        </div>
        <div className="w-full flex justify-end pr-[5%] sm:pr-[8%] lg:pr-[10%] translate-y-[9cqh] sm:translate-y-[8cqh]">
          <span
            className="font-display font-extrabold tracking-[-0.02em] leading-[0.82] text-[clamp(88px,23cqh,270px)] hero-outline-text"
            style={{
              WebkitTextStroke: `1px rgba(255, 255, 255, ${strokeOpacity})`,
            }}
          >
            SHAH
          </span>
        </div>
      </div>
    );
  }

  return (
    <h1 className="hero-solid-layer absolute inset-0 flex flex-col justify-center pointer-events-none select-none z-10">
      <div className="w-full flex justify-start pl-[5%] sm:pl-[8%] lg:pl-[11%] -translate-y-[13cqh] sm:-translate-y-[15cqh] ">
        <span
          id="hero-name-raj"
          className="inline-block font-display font-extrabold tracking-[-0.02em] leading-[0.82] text-[#F4F4F0] text-[clamp(88px,23cqh,270px)] animate-slide-in-left"
        >
          RAJ
        </span>
      </div>
      <div className="w-full flex justify-end pr-[5%] sm:pr-[8%] lg:pr-[10%] translate-y-[9cqh] sm:translate-y-[8cqh] overflow-hidden">
        <span
          id="hero-name-shah"
          className="inline-block font-display font-extrabold tracking-[-0.02em] leading-[0.82] text-[#F4F4F0] text-[clamp(88px,23cqh,270px)] animate-slide-in-right"
        >
          SHAH
        </span>
      </div>
    </h1>
  );
}

/**
 * Magnetic button wrapper for smooth cursor pull within an 80px radius
 */
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
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    if (dist < 80) {
      setOffset({
        x: (e.clientX - centerX) * 0.35,
        y: (e.clientY - centerY) * 0.35,
      });
    }
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
      }}
    >
      {children}
    </div>
  );
}

export function Hero() {
  const { isCalm } = usePrefersCalm();
  const heroRef = useRef<HTMLElement>(null);
  const lastScanTime = useRef<number>(0);

  // Lock-on scan states
  const [isLockedOn, setIsLockedOn] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);

  // Primary CTA pointer-entry ripple coordinates
  const [primaryCoords, setPrimaryCoords] = useState({ x: 0, y: 0 });
  const [primaryHovered, setPrimaryHovered] = useState(false);

  // Underline drawn state
  const [underlineDrawn, setUnderlineDrawn] = useState(false);

  // Trigger DrawSVG underline animation after initial name entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setUnderlineDrawn(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Trigger Lock-On Scan on portrait hover/touch
  const handlePortraitEnter = () => {
    setIsLockedOn(true);
    const now = Date.now();
    if (now - lastScanTime.current > 1500) {
      lastScanTime.current = now;
      if (!isCalm) {
        setScanActive(true);
        setTimeout(() => setScanActive(false), 700);
      }
    }
  };

  const handlePortraitLeave = () => {
    setIsLockedOn(false);
    setScanActive(false);
  };

  const handlePortraitClick = () => {
    // Touch tap toggle support
    setIsLockedOn((prev) => !prev);
    const now = Date.now();
    if (now - lastScanTime.current > 1500 && !isCalm) {
      lastScanTime.current = now;
      setScanActive(true);
      setTimeout(() => setScanActive(false), 700);
    }
  };

  // Primary button ripple entry tracking
  const handlePrimaryMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPrimaryCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setPrimaryHovered(true);
  };

  const handlePrimaryMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPrimaryCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={heroRef}
      aria-label="Introduction and Hero Stage"
      className="relative w-full h-[100svh] min-h-[640px] max-h-[1080px] overflow-hidden flex flex-col justify-end items-center @container select-none"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(198, 255, 61, 0.05) 0%, #0A0A0B 100%)",
      }}
    >
      {/* ============================================================ */}
      {/* LAYER 1: Solid Name (h1) */}
      {/* ============================================================ */}
      <HeroName />

      {/* ============================================================ */}
      {/* LAYER 2: Static Portrait (next/image) + Natural Fade */}
      {/* Rendered height: ~106% stage height, bottom anchored, bleeding off edge */}
      {/* ============================================================ */}
      <div
        className="pointer-events-none absolute bottom-[-4svh] left-0 right-0 h-[106svh] flex items-end justify-center z-20 overflow-hidden"
      >
        <div className="relative w-full h-full max-w-[920px]">
          <Image
            src="/hero/raj_shah_hero_image.png"
            alt="Portrait of Raj Shah"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 96vw, (max-width: 1440px) 840px, 920px"
            className="object-contain object-bottom filter drop-shadow-[0_0_18px_rgba(198,255,61,0.18)]"
          />

          {/* Natural Bottom Fade into #0A0A0B page background (No green/lime wash) */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-44 sm:h-52 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/85 to-transparent z-22"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 3: Outlined Name Layer Clipped with Same Cutout Alpha */}
      {/* -webkit-text-stroke: 1px rgba(255,255,255,0.9), transparent fill */}
      {/* Sized & positioned identically to Layer 2 so outlines appear only over body */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4svh] left-0 right-0 h-[106svh] flex items-end justify-center z-25 overflow-hidden"
        style={{
          WebkitMaskImage: "url(/hero/raj_shah_hero_image.png)",
          maskImage: "url(/hero/raj_shah_hero_image.png)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center bottom",
          maskPosition: "center bottom",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <div className="relative w-full h-full max-w-[920px]">
          {/* Identical HeroName component in outline mode */}
          <HeroName isOutline strokeOpacity={isLockedOn ? 1.0 : 0.9} />

          {/* Sweeping 1px Lime Scan Line (Clipped strictly to body alpha) */}
          {scanActive && !isCalm && (
            <div
              className="absolute inset-x-0 h-[2px] bg-accent shadow-[0_0_24px_4px_#C6FF3D] pointer-events-none z-30 animate-scanline"
            />
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 4: Interactive Lock-On Hover Zone & HUD Reticle */}
      {/* ============================================================ */}
      <div
        onPointerEnter={handlePortraitEnter}
        onPointerLeave={handlePortraitLeave}
        onClick={handlePortraitClick}
        aria-label="Interactive Portrait Stage"
        role="region"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(640px,85vw)] h-[85%] z-28 cursor-crosshair"
      >
        {/* Four Corner Reticle Brackets around Face */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-1/2 -translate-x-1/2 top-[16cqh] w-[150px] sm:w-[180px] h-[170px] sm:h-[200px] transition-all duration-200 ease-out",
            isLockedOn ? "opacity-100 scale-100" : "opacity-0 scale-115 pointer-events-none"
          )}
        >
          {/* Top-Left Bracket */}
          <span className="absolute top-0 left-0 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-accent" />
          {/* Top-Right Bracket */}
          <span className="absolute top-0 right-0 w-5 h-5 border-t-[1.5px] border-r-[1.5px] border-accent" />
          {/* Bottom-Left Bracket */}
          <span className="absolute bottom-0 left-0 w-5 h-5 border-b-[1.5px] border-l-[1.5px] border-accent" />
          {/* Bottom-Right Bracket */}
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-accent" />

          {/* Micro HUD Tag */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-accent bg-[#0A0A0B]/85 px-2 py-0.5 rounded border border-accent/40">
            TARGET: LOCKED
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 5: Game-Style Strength Cards + SVG Connector Lines */}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute inset-0 z-27">
        {/* SVG Connector Lines to Body Anchors */}
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full text-accent overflow-visible"
        >
          {/* Card 1 Connector: Left Card -> Left Shoulder (430, 560) */}
          <path
            d="M 230 435 L 430 560"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className={cn(
              "transition-opacity duration-300",
              focusedCardId === "card-1"
                ? "opacity-100"
                : focusedCardId
                ? "opacity-30"
                : isLockedOn
                ? "opacity-80"
                : "opacity-40"
            )}
          />
          <circle
            cx="430"
            cy="560"
            r="3.5"
            className={cn(
              "fill-accent transition-transform duration-300",
              focusedCardId === "card-1" || isLockedOn ? "scale-125" : "scale-100"
            )}
          />

          {/* Card 2 Connector: Top-Right Card -> Head Side (565, 305) */}
          <path
            d="M 770 255 L 565 305"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className={cn(
              "transition-opacity duration-300",
              focusedCardId === "card-2"
                ? "opacity-100"
                : focusedCardId
                ? "opacity-30"
                : isLockedOn
                ? "opacity-80"
                : "opacity-40"
            )}
          />
          <circle
            cx="565"
            cy="305"
            r="3.5"
            className={cn(
              "fill-accent transition-transform duration-300",
              focusedCardId === "card-2" || isLockedOn ? "scale-125" : "scale-100"
            )}
          />

          {/* Card 3 Connector: Lower Right Card -> Right Shoulder (590, 620) */}
          <path
            d="M 770 615 L 590 620"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className={cn(
              "transition-opacity duration-300",
              focusedCardId === "card-3"
                ? "opacity-100"
                : focusedCardId
                ? "opacity-30"
                : isLockedOn
                ? "opacity-80"
                : "opacity-40"
            )}
          />
          <circle
            cx="590"
            cy="620"
            r="3.5"
            className={cn(
              "fill-accent transition-transform duration-300",
              focusedCardId === "card-3" || isLockedOn ? "scale-125" : "scale-100"
            )}
          />
        </svg>

        {/* The 3 Character Strength Cards as an Accessible List */}
        <ul aria-label="Core Engineering Strengths" className="contents">
          {/* Card 1: CLASS (Left side, mid-height under RAJ) */}
          <li
            tabIndex={0}
            onFocus={() => setFocusedCardId("card-1")}
            onBlur={() => setFocusedCardId(null)}
            onMouseEnter={() => setFocusedCardId("card-1")}
            onMouseLeave={() => setFocusedCardId(null)}
            className={cn(
              "pointer-events-auto absolute hero-card-1 z-30",
              "w-[145px] sm:w-[210px] md:w-[240px] p-2.5 sm:p-3 rounded-[4px] corner-ticks bg-[#131316]/80 backdrop-blur-md border",
              "transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
              focusedCardId === "card-1"
                ? "border-accent/80 shadow-[0_0_16px_rgba(198,255,61,0.2)]"
                : focusedCardId
                ? "border-white/10 opacity-50"
                : isLockedOn
                ? "border-accent/60"
                : "border-white/12"
            )}
          >
            <span className="block font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-accent uppercase">
              {siteConfig.heroStrengthCards[0].label}
            </span>
            <p className="mt-0.5 sm:mt-1 font-sans text-[12px] sm:text-[14px] font-medium text-[#F4F4F0]/90 leading-tight">
              {siteConfig.heroStrengthCards[0].text}
            </p>
          </li>

          {/* Card 2: TRAIT (Top-right, above SHAH) */}
          <li
            tabIndex={0}
            onFocus={() => setFocusedCardId("card-2")}
            onBlur={() => setFocusedCardId(null)}
            onMouseEnter={() => setFocusedCardId("card-2")}
            onMouseLeave={() => setFocusedCardId(null)}
            className={cn(
              "pointer-events-auto absolute hero-card-2 z-30",
              "w-[145px] sm:w-[210px] md:w-[240px] p-2.5 sm:p-3 rounded-[4px] corner-ticks bg-[#131316]/80 backdrop-blur-md border",
              "transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
              focusedCardId === "card-2"
                ? "border-accent/80 shadow-[0_0_16px_rgba(198,255,61,0.2)]"
                : focusedCardId
                ? "border-white/10 opacity-50"
                : isLockedOn
                ? "border-accent/60"
                : "border-white/12"
            )}
          >
            <span className="block font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-accent uppercase">
              {siteConfig.heroStrengthCards[1].label}
            </span>
            <p className="mt-0.5 sm:mt-1 font-sans text-[12px] sm:text-[14px] font-medium text-[#F4F4F0]/90 leading-tight">
              {siteConfig.heroStrengthCards[1].text}
            </p>
          </li>

          {/* Card 3: ABILITY (Right, lower near shoulder) */}
          <li
            tabIndex={0}
            onFocus={() => setFocusedCardId("card-3")}
            onBlur={() => setFocusedCardId(null)}
            onMouseEnter={() => setFocusedCardId("card-3")}
            onMouseLeave={() => setFocusedCardId(null)}
            className={cn(
              "pointer-events-auto absolute hero-card-3 z-30",
              "w-[145px] sm:w-[210px] md:w-[240px] p-2.5 sm:p-3 rounded-[4px] corner-ticks bg-[#131316]/80 backdrop-blur-md border",
              "transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
              focusedCardId === "card-3"
                ? "border-accent/80 shadow-[0_0_16px_rgba(198,255,61,0.2)]"
                : focusedCardId
                ? "border-white/10 opacity-50"
                : isLockedOn
                ? "border-accent/60"
                : "border-white/12"
            )}
          >
            <span className="block font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-accent uppercase">
              {siteConfig.heroStrengthCards[2].label}
            </span>
            <p className="mt-0.5 sm:mt-1 font-sans text-[12px] sm:text-[14px] font-medium text-[#F4F4F0]/90 leading-tight">
              {siteConfig.heroStrengthCards[2].text}
            </p>
          </li>
        </ul>
      </div>

      {/* ============================================================ */}
      {/* LAYER 6: Bottom Caption + Centered CTA Button Group */}
      {/* Absolute pinned over the natural bottom fade */}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute bottom-5 sm:bottom-7 lg:bottom-9 inset-x-0 z-30 w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 sm:gap-6">
        {/* Caption at Bottom-Left: "I build things worth using." */}
        <div className="pointer-events-auto flex flex-col items-center md:items-start select-none">
          <p className="font-serif italic text-[#F4F4F0] text-[clamp(24px,3.1cqw,52px)] leading-[1.08] tracking-tight text-center md:text-left">
            <span>{siteConfig.heroCaption.line1}</span>
            <br />
            <span className="text-accent relative inline-block">
              {siteConfig.heroCaption.line2}
              {/* Hand-drawn Lime Underline */}
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
                    transition: "stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </svg>
            </span>
          </p>
        </div>

        {/* Centered CTA Buttons Group over Portrait Fade */}
        <div className="pointer-events-auto flex justify-center items-center">
          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            {/* Primary CTA: "Explore selected work" Keycap Button */}
            <MagneticWrapper disabled={isCalm}>
              <Link
                href={siteConfig.heroCtas.primary.href}
                onMouseEnter={handlePrimaryMouseEnter}
                onMouseMove={handlePrimaryMouseMove}
                onMouseLeave={() => setPrimaryHovered(false)}
                className="group relative inline-flex items-center justify-center gap-3 h-12 px-7 rounded-full bg-accent text-[#0A0A0B] font-sans font-semibold text-sm tracking-wide btn-keycap overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] cursor-pointer"
              >
                {/* Pointer-Entry Radial Ripple */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-[#D4FF66] transition-[clip-path] duration-500 ease-out"
                  style={{
                    clipPath: primaryHovered
                      ? `circle(160% at ${primaryCoords.x}px ${primaryCoords.y}px)`
                      : `circle(0% at ${primaryCoords.x}px ${primaryCoords.y}px)`,
                  }}
                />

                {/* Text Roll Micro-Animation (Fixed 20px height) */}
                <span className="relative z-10 block overflow-hidden h-[20px] leading-[20px]">
                  <span className="block transition-transform duration-350 ease-out group-hover:-translate-y-[20px]">
                    <span className="block h-[20px] leading-[20px] text-[#0A0A0B] font-sans font-semibold text-sm whitespace-nowrap">
                      {siteConfig.heroCtas.primary.text}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block h-[20px] leading-[20px] text-[#0A0A0B] font-sans font-semibold text-sm whitespace-nowrap"
                    >
                      {siteConfig.heroCtas.primary.text}
                    </span>
                  </span>
                </span>

                {/* Rotating Arrow Chip */}
                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#0A0A0B] text-accent transition-transform duration-300 group-hover:rotate-45"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </MagneticWrapper>

            {/* Secondary CTA: "Have a project in mind?" Ghost Button */}
            <MagneticWrapper disabled={isCalm}>
              <Link
                href={siteConfig.heroCtas.secondary.href}
                className="group relative inline-flex items-center justify-center h-12 px-6 rounded-full border border-line bg-[#131316]/70 backdrop-blur-md text-[#F4F4F0] font-sans font-medium text-sm conic-border-glow hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] cursor-pointer"
              >
                {/* Text Roll to "Let's talk" (Fixed 20px height) */}
                <span className="relative block overflow-hidden h-[20px] leading-[20px]">
                  <span className="block transition-transform duration-350 ease-out group-hover:-translate-y-[20px]">
                    <span className="block h-[20px] leading-[20px] text-[#F4F4F0] font-sans font-medium text-sm whitespace-nowrap">
                      {siteConfig.heroCtas.secondary.text}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block h-[20px] leading-[20px] text-accent font-sans font-medium text-sm whitespace-nowrap"
                    >
                      {siteConfig.heroCtas.secondary.hoverText}
                    </span>
                  </span>
                </span>
              </Link>
            </MagneticWrapper>
          </div>
        </div>

        {/* Empty balancing spacer for desktop alignment */}
        <div className="hidden md:block w-[140px] lg:w-[200px]" aria-hidden="true" />
      </div>
    </section>
  );
}
