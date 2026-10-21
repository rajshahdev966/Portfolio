
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowRight, MoveRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "Observe",
    title: "Start with a problem worth solving.",
    description:
      "I look for the friction people have learned to live with. ARC started with a simple observation: solving DSA problems is only part of learning. The approaches, mistakes, and progress matter, too.",
    focus: "Problem discovery",
  
    accent: "lime",
  },
  {
    step: "02",
    name: "Explore",
    title: "Find the right way to build it.",
    description:
      "I explore possible approaches, technical trade-offs, and constraints before committing. In DEVIntel, that meant working within GitHub API rate limits while building a useful developer intelligence dashboard.",
    focus: "Research & architecture",
  
    accent: "cyan",
  },
  {
    step: "03",
    name: "Shape",
    title: "Give the product its own identity.",
    description:
      "I design around the product instead of defaulting to another generic dashboard. ARC gets a neo-brutalist scrapbook aesthetic; Alchemy Stories takes a more editorial, botanical direction.",
    focus: "Design & interaction",

    accent: "pink",
  },
  {
    step: "04",
    name: "Build",
    title: "Make every interaction count.",
    description:
      "I turn the idea into working software: interfaces, API integrations, state management, responsive layouts, and thoughtful motion. The details should feel intentional and the underlying system should behave predictably.",
    focus: "Frontend engineering",
    accent: "lime",
  },
  {
    step: "05",
    name: "Ship",
    title: "Make it real. Then make it better.",
    description:
      "I work toward products that can be deployed, tested, and used beyond a local demo. Accessibility, performance, maintainability, and feedback all matter when an idea becomes a real experience.",
    focus: "Quality & deployment",
    accent: "cyan",
  },
] as const;

type ProcessStep = (typeof PROCESS_STEPS)[number];

const ACCENT_CLASSES = {
  lime: {
    text: "text-accent",
    border: "border-accent/40",
    dot: "bg-accent",
    glow: "shadow-[0_0_24px_rgba(198,255,61,0.12)]",
  },
  cyan: {
    text: "text-[#00E5FF]",
    border: "border-[#00E5FF]/40",
    dot: "bg-[#00E5FF]",
    glow: "shadow-[0_0_24px_rgba(0,229,255,0.10)]",
  },
  pink: {
    text: "text-[#FF2A85]",
    border: "border-[#FF2A85]/40",
    dot: "bg-[#FF2A85]",
    glow: "shadow-[0_0_24px_rgba(255,42,133,0.10)]",
  },
} as const;

function ProcessCard({
  step,
  active,
}: {
  step: ProcessStep;
  active: boolean;
}) {
  const accent = ACCENT_CLASSES[step.accent];

  return (
    <article
      data-process-card
      className={[
        "process-card group relative flex min-h-[400px] flex-col",
        "w-full shrink-0 overflow-visible rounded-2xl",
        "border border-white/10 bg-[#111114]",
        "p-6 sm:p-8 lg:w-[410px]",
        "transition-[border-color,background-color] duration-300",
        active ? accent.border : "",
      ].join(" ")}
    >

      {/* Hanger ring */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -top-[49px] left-1/2",
          "h-3.5 w-3.5 -translate-x-1/2 rounded-full border",
          "bg-[#0A0A0B] transition-colors duration-300",
          active ? accent.border : "border-white/30",
        ].join(" ")}
      >
        <span
          className={[
            "absolute inset-[3px] rounded-full",
            active ? accent.dot : "bg-white/30",
          ].join(" ")}
        />
      </div>

      {/* Card header */}
      <div className="flex items-start justify-between gap-4">
        <span
          className={[
            "font-display text-[76px] font-extrabold leading-[0.85]",
            "tracking-[-0.08em] transition-colors duration-300",
            active ? accent.text : "text-white/[0.14]",
          ].join(" ")}
        >
          {step.step}
        </span>
      </div>

      {/* Phase label */}
      <div className="mt-8 flex items-center gap-2">
        <span
          className={[
            "h-1.5 w-1.5 rounded-full",
            active ? accent.dot : "bg-white/25",
          ].join(" ")}
        />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/45 ">
          Phase {step.step} / {step.name}
        </span>
      </div>

      {/* Main content */}
      <div className="mt-4">
        <h3 className="max-w-[330px] font-display text-2xl font-bold leading-[1.12] tracking-tight text-[#F4F4F0] sm:text-[28px]">
          {step.title}
        </h3>

        <p className="mt-4 font-sans text-sm leading-[1.8] text-white/55">
          {step.description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
            Focus area
          </span>
          <span
            className={[
              "font-mono text-[10px] uppercase tracking-wide",
              active ? accent.text : "text-white/60",
            ].join(" ")}
          >
            {step.focus}
          </span>
        </div>

        <ArrowDownRight
          aria-hidden="true"
          className={[
            "h-5 w-5 shrink-0 transition-transform duration-300",
            active
              ? `${accent.text} translate-x-0.5 translate-y-0.5`
              : "text-white/25",
          ].join(" ")}
        />
      </div>
    </article>
  );
}

/** Pre-paint on the client, plain effect on the server (no SSR warning). */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function Process() {
  const { isCalm } = usePrefersCalm();

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollRangeRef = useRef({ start: 0, end: 0 });
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const goToStep = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;

      if (!section || !track || !viewport) return;

      const isDesktop = window.matchMedia("(min-width: 1025px)").matches;

      if (isCalm || !isDesktop) {
        section.querySelectorAll("[data-process-card]")[index]?.scrollIntoView({
          behavior: isCalm ? "auto" : "smooth",
          block: "center",
          inline: "nearest",
        });
        setActiveIndex(index);
        return;
      }

      let { start, end } = scrollRangeRef.current;
      if (end <= start) {
        const st = ScrollTrigger.getById("process-pin");
        if (st) {
          start = st.start;
          end = st.end;
        }
      }

      if (end <= start) return;

      const total = PROCESS_STEPS.length;
      // Step 0 targets 0%, Step (total-1) targets 100%, middle steps are evenly distributed
      const targetProgress = total <= 1 ? 0 : Math.max(0, Math.min(1, index / (total - 1)));

      window.scrollTo({
        top: start + (end - start) * targetProgress,
        behavior: "smooth",
      });
    },
    [isCalm]
  );

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!section || !pinWrapper || !viewport || !track) return;

    const media = window.matchMedia("(min-width: 1025px)");

    if (isCalm || !media.matches) {
      gsap.set(track, { clearProps: "transform" });

      if (progress) {
        gsap.set(progress, { scaleX: 0 });
      }

      const cardElements = section.querySelectorAll<HTMLElement>("[data-process-card]");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Array.from(cardElements).indexOf(entry.target as HTMLElement);
              if (idx !== -1) {
                setActiveIndex(idx);
                activeIndexRef.current = idx;
              }
            }
          });
        },
        { rootMargin: "-30% 0px -30% 0px", threshold: 0.1 }
      );

      cardElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }

    const ctx = gsap.context(() => {
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-process-card]")
      );

      const getDistance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);

      const updateActiveCard = (_distance: number, scrollProgress: number) => {
        const p = Math.max(0, Math.min(1, scrollProgress));
        const total = cards.length;
        if (total === 0) return;

        // Evenly partition progress [0, 1] into `total` segments:
        // Card 0: [0.00, 0.20), Card 1: [0.20, 0.40) ... Card 4: [0.80, 1.00]
        let nearestIndex: number;
        if (p <= 0.001) {
          nearestIndex = 0;
        } else if (p >= 0.999) {
          nearestIndex = total - 1;
        } else {
          nearestIndex = Math.min(total - 1, Math.max(0, Math.floor(p * total)));
        }

        if (activeIndexRef.current !== nearestIndex) {
          activeIndexRef.current = nearestIndex;
          setActiveIndex(nearestIndex);

          cards.forEach((card, index) => {
            const isActive = index === nearestIndex;

            gsap.to(card, {
              rotation: isActive ? 0 : index % 2 === 0 ? -1.1 : 1.1,
              y: isActive ? 0 : 7,
              scale: isActive ? 1 : 0.975,
              duration: 0.45,
              ease: "power3.out",
              overwrite: true,
            });
          });
        }
      };

      gsap.set(cards, {
        transformOrigin: "50% 0%",
        rotation: (index: number) => (index % 2 === 0 ? -1.1 : 1.1),
        y: 7,
        scale: 0.975,
      });

      gsap.set(cards[0], {
        rotation: 0,
        y: 0,
        scale: 1,
      });

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          id: "process-pin",
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.8,
          pin: pinWrapper,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onRefresh: (self) => {
            scrollRangeRef.current = {
              start: self.start,
              end: self.end,
            };

            updateActiveCard(getDistance(), self.progress);
          },

          onUpdate: (self) => {
            const distance = getDistance();

            scrollRangeRef.current = {
              start: self.start,
              end: self.end,
            };

            if (progress) {
              gsap.set(progress, {
                scaleX: self.progress,
              });
            }

            updateActiveCard(distance, self.progress);
          },
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ScrollTrigger.getById("process-pin")?.kill(true);
      ctx.revert();
      scrollRangeRef.current = { start: 0, end: 0 };
      activeIndexRef.current = 0;
    };
  }, [isCalm]);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative z-20 border-b border-white/[0.08] bg-[#0A0A0B]"
    >
      <div
        ref={pinWrapperRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-clip py-16 lg:h-[100svh] lg:py-0 w-full"
      >
        {/* Background detail */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.35) 0.7px, transparent 0.7px)",
            backgroundSize: "22px 22px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

      <div className="relative mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <header className="px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
            <div>
              <h2
                id="process-heading"
                className="text-heading-2 text-text font-bold uppercase tracking-tight"
              >
                HOW I WORK
              </h2>
            </div>

            <div className="max-w-sm">
              <p className="font-sans text-sm leading-7 text-white/50">
                Five stages. One goal: turn a real problem into a product
                people can actually use.
              </p>
            </div>
          </div>

          {/* Step navigation and progress */}
          <div className="mt-5 flex items-center justify-between gap-4">
            <nav
              aria-label="Process steps"
              className="flex flex-wrap items-center gap-1.5 sm:gap-2"
            >
              {PROCESS_STEPS.map((step, index) => (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => goToStep(index)}
                  aria-label={`Go to step ${step.step}: ${step.name}`}
                  aria-current={activeIndex === index ? "step" : undefined}
                  className={[
                    "rounded-full border px-3 py-2 font-mono text-[10px]",
                    "transition-colors duration-200 focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-accent",
                    activeIndex === index
                      ? "border-accent/50 bg-accent text-[#0A0A0B]"
                      : "border-white/10 text-white/45 hover:border-white/30 hover:text-white",
                  ].join(" ")}
                >
                  {step.step}
                </button>
              ))}
            </nav>

            <span className="hidden shrink-0 font-mono text-md uppercase tracking-widest text-white/35 sm:block">
              {PROCESS_STEPS[activeIndex].name}
            </span>
          </div>

          <div
            className="mt-4 h-px w-full overflow-hidden bg-white/10"
            role="progressbar"
            aria-label="Process progress"
            aria-valuemin={1}
            aria-valuemax={PROCESS_STEPS.length}
            aria-valuenow={activeIndex + 1}
          >
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-0 bg-accent shadow-[0_0_16px_rgba(198,255,61,0.5)]"
            />
          </div>
        </header>

        {/* Card viewport and hanging rail */}
        <div
          ref={viewportRef}
          className="relative mt-16 overflow-visible lg:mt-[76px] lg:overflow-hidden"
        >
          {/* Rail remains fixed while cards travel beneath it */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[-36px] hidden h-px bg-white/15 lg:block"
          >
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          </div>

          <div
            ref={trackRef}
            className={[
              "flex flex-col gap-14 px-5 pb-4 sm:px-8",
              "lg:w-max lg:flex-row lg:gap-8 lg:px-12 lg:pb-8",
              isCalm ? "lg:flex-col lg:w-full" : "",
            ].join(" ")}
          >
            {PROCESS_STEPS.map((step, index) => (
              <ProcessCard
                key={step.step}
                step={step}
                active={activeIndex === index}
              />
            ))}
          </div>
        </div>

      </div>
      </div>
    </section>
  );
}
