"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { Quote, CheckCircle2, ArrowUpRight, Building2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Initials mapper
function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function Testimonials() {
  const testimonials = siteConfig.testimonials || siteConfig.buildInPublicCards;

  return (
    <section
      id="testimonials"
      aria-label="Client Testimonials and Endorsements"
      className="relative z-20 border-b border-line bg-[#08080B] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16 border-b border-line/60 pb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text tracking-tight uppercase leading-none">
              TESTIMONIALS
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-muted-dim max-w-md leading-relaxed md:text-right">
            Feedback from founders, educators, and agency partners on shipping
            AI integrations, interactive apps, and web platforms with me and Neurolearn Media.
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => {
            const initials = getInitials(item.author);

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-line/80 bg-[#0C0C10] p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_30px_rgba(198,255,61,0.12)] hover:-translate-y-1"
              >
                {/* Subtle Top-Right Quote Icon Accent */}
                <div
                  aria-hidden="true"
                  className="absolute top-6 right-6 text-white/[0.06] group-hover:text-accent/20 transition-colors duration-300 pointer-events-none"
                >
                  <Quote className="h-10 w-10 rotate-180" />
                </div>

                {/* Top Section: Author Header & Quote */}
                <div>
                  {/* Author Header */}
                  <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-line/60">
                    {/* Glowing Initials Badge */}
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#14190D] border border-accent/40 text-accent font-mono text-sm font-bold shadow-[0_0_12px_rgba(198,255,61,0.15)] group-hover:border-accent group-hover:shadow-[0_0_18px_rgba(198,255,61,0.3)] transition-all">
                      {initials}
                    </div>

                    <div className="flex flex-col min-w-0 pr-4">
                      <h3 className="font-display font-bold text-base text-text tracking-tight truncate group-hover:text-accent transition-colors">
                        {item.author}
                      </h3>
                      <p className="font-mono text-[11px] text-muted-dim truncate">
                        {item.role}
                      </p>
                      <p className="font-sans text-[11px] text-[#A0A0A8] truncate mt-0.5">
                        {item.companyOrContext}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="font-sans text-xs sm:text-[13px] text-text/80 leading-relaxed tracking-normal mb-6">
                    &ldquo;{item.content}&rdquo;
                  </blockquote>
                </div>

                {/* Bottom Section: Delivered Scope & Verification Badge */}
                <div className="pt-4 border-t border-line/60 flex flex-col gap-3.5">
                  {item.takeaway && (
                    <div className="rounded-lg bg-surface/50 border border-line/50 p-2.5">
                      <p className="font-mono text-[10.5px] text-accent/90 leading-tight">
                        <span className="font-bold text-accent">SCOPE:</span>{" "}
                        {item.takeaway}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between font-mono text-[10px] text-muted-dim">
                    <div className="flex items-center gap-1.5 text-accent font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                      <span className="tracking-wider">VERIFIED COLLABORATION</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
