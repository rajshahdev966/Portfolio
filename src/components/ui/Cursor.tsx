"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";

type CursorState = "default" | "view" | "drag" | "text" | "hidden";

export function Cursor() {
  const { isCalm } = usePrefersCalm();
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide cursor if in Calm Mode or on coarse pointer (touch) devices
    if (isCalm || window.matchMedia("(pointer: coarse)").matches) {
      setIsVisible(false);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use fast GSAP quickTo setters for 120fps smooth cursor lerp without overhead
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power2.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);

      // Check cursor target element data attributes or tags
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("[data-cursor]") as HTMLElement | null;
      if (interactive) {
        const mode = interactive.getAttribute("data-cursor");
        if (mode === "view") {
          setCursorState("view");
          setCursorLabel("VIEW");
          return;
        }
        if (mode === "drag") {
          setCursorState("drag");
          setCursorLabel("DRAG");
          return;
        }
        if (mode === "hidden") {
          setCursorState("hidden");
          return;
        }
      }

      // Check for generic links / buttons
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setCursorState("view");
        setCursorLabel("");
      } else {
        setCursorState("default");
        setCursorLabel("");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isCalm, isVisible]);

  if (isCalm || !isVisible) return null;

  const isView = cursorState === "view";
  const isDrag = cursorState === "drag";
  const hasLabel = Boolean(cursorLabel);

  return (
    <>
      {/* 10px Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-opacity duration-150 ${
          hasLabel ? "opacity-0" : "opacity-100 h-2.5 w-2.5"
        }`}
      />

      {/* 36px Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/70 transition-all duration-200 ease-out ${
          hasLabel
            ? "h-16 w-16 bg-accent text-[#0A0A0B] font-mono text-[10px] font-bold tracking-widest shadow-[0_0_24px_rgba(198,255,61,0.4)]"
            : isView || isDrag
            ? "h-12 w-12 bg-accent/15 border-accent scale-110"
            : "h-9 w-9 bg-transparent"
        }`}
      >
        {cursorLabel && <span>{cursorLabel}</span>}
      </div>
    </>
  );
}
