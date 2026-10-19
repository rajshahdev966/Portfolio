"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "Discover",
    title: "Immersion in Real Friction",
    description:
      "Every project starts from a firsthand problem or direct user observation—never a generic template. For ARC, it began by noticing that conventional DSA platforms discard the messy brute-force reasoning where real learning actually happens.",
    focus: "Problem Framing & Empathy",
  },
  {
    step: "02",
    name: "Define",
    title: "Boundaries & Hard Constraints",
    description:
      "Clarifying platform limits, API quotas, and operational budgets before writing code. In DEVIntel, the constraint was building a rich developer intelligence dashboard strictly within client-side React and GitHub REST rate limits without a costly intermediary server.",
    focus: "Architecture & Budgeting",
  },
  {
    step: "03",
    name: "Design",
    title: "Tactile, Differentiated Systems",
    description:
      "Designing interfaces with a distinct point of view rather than defaulting to generic SaaS components. Creating the Neo-Brutalist 'pinned desk' language for ARC and the serene botanical editorial atmosphere for Alchemy Stories.",
    focus: "Visual Language & UX",
  },
  {
    step: "04",
    name: "Develop",
    title: "First-Principles Implementation",
    description:
      "Engineering resilient systems: exponential backoff polling for asynchronous API responses, 8-node cyclic DOM pooling to prevent garbage collection spikes in Tunnel Flap, and typed state isolation.",
    focus: "Browser Mechanics & Logic",
  },
  {
    step: "05",
    name: "Deliver",
    title: "Zero-Overhead Deployment",
    description:
      "Shipping lean products with low-maintenance serverless patterns (Firebase, Cloudflare Workers, Google Apps Script), validating accessibility, optimizing Core Web Vitals, and learning from active student users.",
    focus: "Production & Refinement",
  },
];

export function Process() {
  const { isCalm } = usePrefersCalm();
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCalm || window.matchMedia("(max-width: 1024px)").matches) {
      return;
    }

    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    if (!section || !trigger || !track) return;

    const ctx = gsap.context(() => {
      // Total scroll distance is the width of track minus viewport width
      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBar) {
              gsap.to(progressBar, {
                width: `${self.progress * 100}%`,
                duration: 0.1,
                ease: "none",
              });
            }
          },
        },
      });

      tl.to(track, {
        x: () => -totalScroll,
        ease: "none",
      });
    }, trigger);

    return () => ctx.revert();
  }, [isCalm]);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="Engineering Process Methodology"
      className="relative z-20 border-b border-line bg-[#0A0A0B]"
    >
      {/* Desktop Pinned Scroll Container */}
      <div ref={triggerRef} className="relative w-full overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                [ 02 / 06 ] · METHODOLOGY
              </span>
              <h2 className="text-heading-2 text-text font-bold uppercase tracking-tight">
                Process
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-muted max-w-md leading-relaxed">
              From firsthand problem discovery to zero-overhead serverless delivery: how I turn messy friction into reliable software.
            </p>
          </div>

          {/* Progress Indicator Line (Pinned Desktop) */}
          <div className="hidden lg:block relative mt-6 h-1 w-full bg-surface-elevated rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-accent shadow-[0_0_12px_#C6FF3D]"
            />
          </div>
        </div>

        {/* Desktop Horizontal Track (Switches to Vertical Stack in Calm Mode or Mobile) */}
        <div
          ref={trackRef}
          className={`${
            isCalm
              ? "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8"
              : "lg:flex lg:w-max px-4 sm:px-8 lg:px-16 pb-24 gap-8 flex flex-col"
          }`}
        >
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="flex flex-col justify-between rounded-[24px] border border-line bg-surface/50 p-8 sm:p-10 w-full lg:w-[480px] lg:shrink-0 backdrop-blur-md transition-all hover:border-line-bright"
            >
              <div>
                {/* Step Numeral & Focus Pill */}
                <div className="flex items-center justify-between border-b border-line/60 pb-6 mb-6">
                  <span className="font-display text-5xl sm:text-6xl font-extrabold text-accent">
                    {step.step}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted border border-line rounded-full px-3 py-1 bg-surface">
                    {step.focus}
                  </span>
                </div>

                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold block mb-2">
                  Phase {step.step}: {step.name}
                </span>

                <h3 className="font-display text-2xl font-bold text-text mb-4">
                  {step.title}
                </h3>

                <p className="font-sans text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step Footer Marker */}
              <div className="mt-8 pt-6 border-t border-line/60 flex items-center justify-between font-mono text-[10px] text-muted-dim">
                <span>STAGE {step.step} OF 05</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
