"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const { isCalm } = usePrefersCalm();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // In Calm mode or with reduced motion, use standard browser scroll
    if (isCalm) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis directly from GSAP's unified ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isCalm]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
