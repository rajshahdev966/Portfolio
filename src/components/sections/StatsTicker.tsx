"use client";

import React, { useRef, useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";


const TICKER_ITEMS = [
  "TYPESCRIPT",
  "TAILWIND CSS V4",
  "GSAP & SCROLLTRIGGER",
  "THREE.JS / R3F",
  "INTERACTIVE WEB EXPERIENCES",
  "UI ENGINEERING",
  "REST APIS & INTEGRATION",
  "STATE MANAGEMENT",
  "FIREBASE",
  "GOOGLE APPS SCRIPT",
  "JAVA & DATA STRUCTURES",
  "ALGORITHMS & PROBLEM SOLVING",
  "WEBGL & SHADERS",
  "ACCESSIBILITY (WCAG)",
  "PERFORMANCE OPTIMIZATION",
  "PRODUCT-FOCUSED DEVELOPMENT",
  "BUILDING SINCE 2022",
  "NEXT.JS",
  "REACT 19",
];


export function StatsTicker() {
  const { isCalm } = usePrefersCalm();
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Counter entry trigger
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Verified Statistics & Stack Ticker"
      className="relative z-20 border-y border-line bg-surface/40 py-10 overflow-hidden select-none"
    >
      {/* Top Part: Verified Stats Strip */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-line">
          {siteConfig.verifiedStats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`flex flex-col gap-1.5 ${idx > 0 ? "pt-6 sm:pt-0 sm:pl-8" : ""}`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-accent tracking-tight">
                  {hasEntered || isCalm ? stat.value : "0"}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-text">
                {stat.label}
              </h3>
              <p className="font-sans text-xs text-muted leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Part: Smooth Scroll-Reactive Ticker */}
      <div className="relative w-full overflow-hidden border-t border-line/60 pt-6 text-md ">
        <div
          ref={marqueeRef}
          className="flex w-max items-center gap-8 animate-marquee hover:[animation-play-state:paused]"
        >
          {/* Main Set */}
          <div className="flex items-center gap-8">
            {TICKER_ITEMS.map((tech) => (
              <span
                key={tech}
                className="font-mono uppercase tracking-widest text-muted/70 hover:text-accent transition-colors flex items-center gap-10"
              >
                <span>{tech}</span>
                <span className="text-accent/40 font-bold">/</span>
              </span>
            ))}
          </div>

          {/* Duplicate set for seamless looping (aria-hidden) */}
          <div aria-hidden="true" className="flex items-center gap-8 shrink-0">
            {TICKER_ITEMS.map((tech, idx) => (
              <span
                key={`dup-${idx}`}
                className="font-mono text-xs uppercase tracking-widest text-muted/70 hover:text-accent transition-colors flex items-center gap-8"
              >
                <span>{tech}</span>
                <span className="text-accent/40 font-bold">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
