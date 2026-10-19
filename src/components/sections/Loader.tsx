"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";

const SCRAMBLE_CHARS = "0123456789_/-*#$@!~";

export function Loader({ onComplete }: { onComplete?: () => void }) {
  const { isCalm } = usePrefersCalm();
  const [visible, setVisible] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [scrambleName, setScrambleName] = useState<string>("___ ____");

  const loaderRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hasFinishedRef = useRef<boolean>(false);

  useEffect(() => {
    // 1. Skip on return visits in same browser session
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("raj_shah_loader_seen");
      if (seen) {
        setVisible(false);
        onComplete?.();
        return;
      }
    }

    // 2. Reduced motion / Calm mode instant skip
    if (isCalm) {
      sessionStorage.setItem("raj_shah_loader_seen", "true");
      setVisible(false);
      onComplete?.();
      return;
    }

    const loaderEl = loaderRef.current;
    const svgEl = svgRef.current;
    if (!loaderEl || !svgEl) return;

    // Track real assets progress
    let realTargetProgress = 15; // base DOM loaded

    // Check fonts ready
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        realTargetProgress = Math.max(realTargetProgress, 45);
      });
    }

    // Check hero image decode
    const img = new Image();
    img.src = "/hero/raj_shah_hero_image.png";
    img.decode()
      .then(() => {
        realTargetProgress = Math.max(realTargetProgress, 85);
      })
      .catch(() => {
        realTargetProgress = Math.max(realTargetProgress, 75);
      });

    // Check WebGL context
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        realTargetProgress = 100;
      }
    } catch {
      realTargetProgress = 100;
    }

    // Signature path stroke setup
    const strokes = svgEl.querySelectorAll<SVGPathElement>(".sig-stroke");
    const dot = svgEl.querySelector<SVGCircleElement>(".sig-dot");

    strokes.forEach((stroke) => {
      const len = stroke.getTotalLength();
      stroke.style.strokeDasharray = `${len}`;
      stroke.style.strokeDashoffset = `${len}`;
    });

    if (dot) {
      gsap.set(dot, { opacity: 0, scale: 0, transformOrigin: "center" });
    }

    // Animate stroke by stroke sequentially over ~1.6s
    const tl = gsap.timeline({
      onComplete: () => {
        realTargetProgress = 100;
      },
    });

    strokes.forEach((stroke, idx) => {
      tl.to(
        stroke,
        {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: "power2.inOut",
        },
        idx * 0.22
      );
    });

    if (dot) {
      tl.to(dot, { opacity: 1, scale: 1, duration: 0.15, ease: "back.out(2)" });
    }

    // Smooth counter animation 000 -> 100
    let currentProgress = 0;
    const counterInterval = setInterval(() => {
      currentProgress += (realTargetProgress - currentProgress) * 0.15;
      const rounded = Math.min(100, Math.floor(currentProgress));
      setProgress(rounded);

      // Scramble name "RAJ SHAH"
      if (rounded < 100) {
        const full = "RAJ SHAH";
        const charsResolved = Math.floor((rounded / 100) * full.length);
        let s = "";
        for (let i = 0; i < full.length; i++) {
          if (full[i] === " ") {
            s += " ";
          } else if (i < charsResolved) {
            s += full[i];
          } else {
            s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }
        setScrambleName(s);
      } else {
        setScrambleName("RAJ SHAH");
      }

      if (rounded >= 100 && !hasFinishedRef.current) {
        hasFinishedRef.current = true;
        clearInterval(counterInterval);
        finishLoader();
      }
    }, 30);

    // Hard cap 3.0s fallback
    const hardCapTimer = setTimeout(() => {
      if (!hasFinishedRef.current) {
        hasFinishedRef.current = true;
        clearInterval(counterInterval);
        setProgress(100);
        setScrambleName("RAJ SHAH");
        finishLoader();
      }
    }, 3000);

    function finishLoader() {
      // 1. Signature flashes lime for 150ms
      gsap.to(svgEl, {
        filter: "drop-shadow(0 0 24px #C6FF3D) drop-shadow(0 0 8px #C6FF3D)",
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // 2. Slide loader panel up with quart-in-out easing (translateY -100%, 900ms)
          gsap.to(loaderEl, {
            yPercent: -100,
            duration: 0.9,
            ease: "cubic-bezier(0.76, 0, 0.24, 1)",
            onComplete: () => {
              sessionStorage.setItem("raj_shah_loader_seen", "true");
              setVisible(false);
              onComplete?.();
            },
          });
        },
      });
    }

    return () => {
      clearInterval(counterInterval);
      clearTimeout(hardCapTimer);
      tl.kill();
    };
  }, [isCalm, onComplete]);

  if (!visible) return null;

  const paddedProgress = progress.toString().padStart(3, "0");

  return (
    <aside
      ref={loaderRef}
      aria-label="Site loading sequence"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0A0A0B] p-6 sm:p-12 text-text select-none overflow-hidden"
    >
      {/* Top Bar: Name & Real Progress Status */}
      <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#C6FF3D]" />
          <span className="tracking-widest uppercase font-semibold text-text">
            {scrambleName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-dim hidden sm:inline">
            INITIALIZING WORKSPACE
          </span>
          <span className="font-bold text-accent text-sm tracking-wider">
            {paddedProgress}%
          </span>
        </div>
      </div>

      {/* Centerpiece: Signature Drawing Canvas */}
      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="relative w-full max-w-md px-4">
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 435 256"
            className="w-full h-auto max-h-64 overflow-visible filter drop-shadow-[0_0_12px_rgba(198,255,61,0.25)] transition-all duration-150"
          >
            {/* Stroke 1: Left Initial & Swirl */}
            <path
              className="sig-stroke sig-stroke-1"
              d="M 38 185 C 26 160 25 138 38 132 C 55 124 64 148 60 178 C 54 212 40 216 46 221 C 52 225 72 200 86 195 C 102 188 116 182 124 175"
              stroke="#C6FF3D"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Stroke 2: Center Stem & Descender Loop */}
            <path
              className="sig-stroke sig-stroke-2"
              d="M 124 175 C 127 185 125 210 118 222 C 114 230 128 234 142 232 C 151 228 152 215 144 195 C 136 175 148 165 156 156"
              stroke="#C6FF3D"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Stroke 3: High Ascender Loop & Swirl */}
            <path
              className="sig-stroke sig-stroke-3"
              d="M 156 156 C 172 135 186 102 192 100 C 196 98 188 125 194 138 C 205 158 214 138 232 132 C 248 124 250 82 248 76 C 245 74 254 95 260 115 C 263 125 260 142 254 144"
              stroke="#C6FF3D"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Stroke 4: Flowing Ligatures */}
            <path
              className="sig-stroke sig-stroke-4"
              d="M 254 144 C 265 142 278 122 288 116 C 300 110 324 92 334 90 C 342 90 326 114 316 118 C 304 124 286 126 270 134"
              stroke="#C6FF3D"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Stroke 5: Underline Sweep & Dot */}
            <path
              className="sig-stroke sig-stroke-5"
              d="M 160 180 C 180 182 220 142 240 142 C 255 142 270 144 290 144"
              stroke="#C6FF3D"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle
              className="sig-dot"
              cx="297"
              cy="190"
              r="4"
              fill="#C6FF3D"
            />
          </svg>
        </div>
      </div>

      {/* Bottom Bar: Brand Promise & Progress Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-4 font-mono text-xs text-muted">
        <span className="text-center sm:text-left">
          Design-Led Product Engineering · Nirma University
        </span>
        <div className="flex items-center gap-3">
          <div className="h-1 w-32 overflow-hidden rounded-full bg-surface-elevated">
            <div
              className="h-full bg-accent transition-all duration-75 ease-out shadow-[0_0_8px_#C6FF3D]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[11px] text-muted-dim">AHMEDABAD, IN</span>
        </div>
      </div>
    </aside>
  );
}
