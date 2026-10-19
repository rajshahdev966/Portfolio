"use client";

import { useRef, useEffect, RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersCalm } from "./usePrefersCalm";

interface UseMagneticOptions {
  radius?: number;
  strength?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  options: UseMagneticOptions = {}
): RefObject<T | null> {
  const { radius = 80, strength = 0.35 } = options;
  const ref = useRef<T | null>(null);
  const { isCalm } = usePrefersCalm();

  useEffect(() => {
    const el = ref.current;
    if (!el || isCalm) return;

    // Skip fine mouse mechanics on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < radius) {
        const pullX = (e.clientX - centerX) * strength;
        const pullY = (e.clientY - centerY) * strength;

        gsap.to(el, {
          x: pullX,
          y: pullY,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [radius, strength, isCalm]);

  return ref;
}
