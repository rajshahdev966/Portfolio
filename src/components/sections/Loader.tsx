"use client";

import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";
import {
  SIGNATURE_SILHOUETTE,
  SIGNATURE_STROKES,
  SIGNATURE_VIEWBOX,
} from "./signaturePaths";

/* ─────────────────────────── tuning ─────────────────────────── */
const FULL_NAME = "RAJ SHAH";
const SCRAMBLE_CHARS = "0123456789_/-*#$@!~";
const DRAW_SECONDS = 2.0; // time to sign — the loader never waits longer than this unless assets are late
const HERO_TIMEOUT_MS = 1500; // never let a slow image hold the screen
const HARD_CAP_MS = 3600; // absolute ceiling before we leave anyway
const EXIT_SECONDS = 0.75;

/** Pre-paint on the client, plain effect on the server (no SSR warning). */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function Loader({ onComplete }: { onComplete?: () => void }) {
  const { isCalm } = usePrefersCalm();
  const [visible, setVisible] = useState<boolean>(true);

  // Keep the latest callback without ever restarting the animation.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const maskId = `sig-mask-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const loaderRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nibRef = useRef<SVGCircleElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const strokeRefs = useRef<(SVGPathElement | null)[]>([]);

  /* 1 ── Skip instantly only when reduced motion / Calm mode is preferred */
  useIsoLayoutEffect(() => {
    if (isCalm) {
      setVisible(false);
      onCompleteRef.current?.();
    }
  }, [isCalm]);

  /* 2 ── The sequence */
  useEffect(() => {
    if (!visible || isCalm) return;
    const loaderEl = loaderRef.current;
    const svgEl = svgRef.current;
    const nib = nibRef.current;
    const strokes = strokeRefs.current;
    if (!loaderEl || !svgEl || !nib) return;

    let finished = false;
    let disposed = false;
    const startedAt = performance.now();

    /* ---- real asset readiness (0..1) — fonts + hero image, with timeouts ---- */
    const ready = { dom: 0.2, fonts: 0, hero: 0 };
    const assetsPct = () => ready.dom + ready.fonts + ready.hero; // 0.2 … 1
    if ("fonts" in document) {
      document.fonts.ready.then(() => (ready.fonts = 0.4)).catch(() => (ready.fonts = 0.4));
    } else {
      ready.fonts = 0.4;
    }
    const hero = new Image();
    hero.src = "/hero/raj_shah_hero_image.png";
    const heroDone = () => (ready.hero = 0.4);
    (hero.decode ? hero.decode() : Promise.resolve()).then(heroDone, heroDone);
    const heroTimer = window.setTimeout(heroDone, HERO_TIMEOUT_MS);

    /* ---- stroke geometry (for the pen nib only) ---- */
    const lengths = strokes.map((s) => (s ? s.getTotalLength() : 0));

    /* ---- one render function drives everything from a single pen position ---- */
    const pen = { p: 0 };
    let lastPct = -1;
    let headStroke = -1;
    let headK = 0;

    const render = () => {
      const p = pen.p;
      headStroke = -1;
      for (let i = 0; i < SIGNATURE_STROKES.length; i++) {
        const el = strokes[i];
        if (!el) continue;
        const s = SIGNATURE_STROKES[i];
        const k = clamp01((p - s.t0) / (s.t1 - s.t0));
        el.style.strokeDashoffset = String(1 - k);
        if (!s.patch && k > 0) {
          headStroke = i; // last real stroke that has started = the pen
          headK = k;
        }
      }

      // pen nib follows the head of the line
      if (headStroke >= 0 && p < 1) {
        const pt = strokes[headStroke]!.getPointAtLength(headK * lengths[headStroke]);
        nib.setAttribute("cx", pt.x.toFixed(1));
        nib.setAttribute("cy", pt.y.toFixed(1));
        nib.style.opacity = "1";
      } else {
        nib.style.opacity = "0";
      }

      // HUD: honest counter — never shows more than assets have really loaded
      const shown = Math.min(Math.round(p * 100), Math.round(assetsPct() * 100));
      const pct = p >= 1 && assetsPct() >= 1 ? 100 : Math.min(shown, 99);
      if (pct !== lastPct) {
        lastPct = pct;
        if (pctRef.current) pctRef.current.textContent = String(pct).padStart(3, "0") + "%";
        if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`;
        if (nameRef.current) {
          const resolved = Math.floor((pct / 100) * FULL_NAME.length);
          let out = "";
          for (let i = 0; i < FULL_NAME.length; i++) {
            const c = FULL_NAME[i];
            out +=
              c === " " || i < resolved || pct >= 100
                ? c
                : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
          }
          nameRef.current.textContent = out;
        }
      }
    };
    render();

    /* ---- exit: lime flash → panel slides up ---- */
    const exit = () => {
      if (finished || disposed) return;
      finished = true;
      pen.p = 1;
      ready.fonts = ready.hero = 0.4;
      lastPct = -1;
      render();
      gsap
        .timeline({
          onComplete: () => {
            setVisible(false);
            onCompleteRef.current?.();
          },
        })
        .to(svgEl, {
          filter: "drop-shadow(0 0 22px rgba(198,255,61,0.9)) drop-shadow(0 0 6px rgba(198,255,61,0.9))",
          duration: 0.16,
          ease: "power2.out",
        })
        .to(svgEl, {
          filter: "drop-shadow(0 0 12px rgba(198,255,61,0.25)) drop-shadow(0 0 0px rgba(198,255,61,0))",
          duration: 0.16,
          ease: "power2.in",
        })
        .to(loaderEl, { yPercent: -100, duration: EXIT_SECONDS, ease: "power4.inOut" }, "+=0.05");
    };

    /* ---- the signing ---- */
    const draw = gsap.to(pen, {
      p: 1,
      duration: DRAW_SECONDS,
      ease: "sine.inOut", // soft pen-down, steady stroke, soft pen-lift
      delay: 0.12,
      onUpdate: render,
      onComplete: () => {
        render();
        // signature is done — leave as soon as assets are too
        const wait = () => {
          if (disposed || finished) return;
          if (assetsPct() >= 1 || performance.now() - startedAt > HARD_CAP_MS) exit();
          else requestAnimationFrame(wait);
        };
        wait();
      },
    });

    // absolute safety net
    const hardCap = window.setTimeout(exit, HARD_CAP_MS + 400);

    return () => {
      disposed = true;
      draw.kill();
      gsap.killTweensOf([svgEl, loaderEl]);
      window.clearTimeout(heroTimer);
      window.clearTimeout(hardCap);
    };
  }, [visible, isCalm]);

  if (!visible) return null;

  return (
    <aside
      ref={loaderRef}
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0A0A0B] p-6 sm:p-12 text-text select-none overflow-hidden will-change-transform"
    >
      <span className="sr-only">Loading Raj Shah’s portfolio</span>

      {/* Top bar */}
      <div
        aria-hidden="true"
        className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs text-muted"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-dim hidden sm:inline">
            INITIALIZING WORKSPACE
          </span>
          <span
            ref={pctRef}
            className="font-bold text-accent text-sm tracking-wider tabular-nums"
          >
            000%
          </span>
        </div>
      </div>

      {/* Signature */}
      <div className="flex flex-1 items-center justify-center py-8">
        <div className="relative w-full max-w-xl px-2">
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={SIGNATURE_VIEWBOX}
            role="img"
            aria-label="Raj Shah signature"
            className="block w-full h-auto overflow-visible"
            style={{ filter: "drop-shadow(0 0 12px rgba(198,255,61,0.25)) drop-shadow(0 0 0px rgba(198,255,61,0))" }}
          >
            <defs>
              {/* The pen: centre-lines, painted on one after another */}
              <mask id={maskId} maskUnits="userSpaceOnUse" x="-40" y="-40" width="1700" height="900">
                {SIGNATURE_STROKES.map((s, i) => (
                  <path
                    key={i}
                    ref={(el) => {
                      strokeRefs.current[i] = el;
                    }}
                    d={s.d}
                    pathLength={1}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={s.w}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="1 2"
                    strokeDashoffset={1}
                  />
                ))}
              </mask>
            </defs>

            {/* The ink: one clean path, revealed by the pen mask */}
            <path
              d={SIGNATURE_SILHOUETTE}
              fill="#C6FF3D"
              fillRule="evenodd"
              mask={`url(#${maskId})`}
            />

            {/* Pen nib */}
            <circle
              ref={nibRef}
              r={13}
              fill="#F4FFD6"
              style={{ opacity: 0, filter: "drop-shadow(0 0 10px #C6FF3D)" }}
            />
          </svg>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        aria-hidden="true"
        className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-4 font-mono text-xs text-muted"
      >
        <span className="text-center sm:text-left">
          Design-Led Product Engineering · Nirma University
        </span>
        <div className="flex items-center gap-3">
          <div className="h-1 w-32 overflow-hidden rounded-full bg-surface-elevated">
            <div
              ref={barRef}
              className="h-full w-full origin-left bg-accent shadow-[0_0_8px_#C6FF3D]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span className="text-[11px] text-muted-dim">AHMEDABAD, IN</span>
        </div>
      </div>
    </aside>
  );
}