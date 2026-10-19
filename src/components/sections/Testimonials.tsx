"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { Linkedin, ArrowUpRight, Sparkles } from "lucide-react";

export function Testimonials() {
  const cards = siteConfig.buildInPublicCards;

  return (
    <section
      aria-label="Build in Public & Engineering Insights"
      className="relative z-20 border-b border-line bg-surface/30 py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b border-line pb-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>[ 05 / 06 ] · BUILD IN PUBLIC</span>
            </span>
            <h2 className="text-heading-2 text-text font-bold uppercase tracking-tight">
              Engineering Notes
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-muted max-w-md leading-relaxed">
            Curated reflections on system architecture, interaction design, and frontend performance written in public.
          </p>
        </div>

        {/* 3 Build in Public Cards with 3D Pointer Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((post) => (
            <div
              key={post.id}
              className="group flex flex-col justify-between rounded-[24px] border border-line bg-surface/50 p-8 transition-all hover:border-line-bright hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between border-b border-line/60 pb-5 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-elevated font-mono text-xs font-bold text-accent border border-line">
                      RS
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-bold text-text">
                        {post.author}
                      </h4>
                      <p className="font-mono text-[10px] text-muted-dim">
                        {post.companyOrContext}
                      </p>
                    </div>
                  </div>

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View verified LinkedIn post"
                    className="text-muted hover:text-accent transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>

                {/* Content */}
                <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed mb-6">
                  "{post.content}"
                </p>
              </div>

              {/* Takeaway / Footnote */}
              <div className="pt-5 border-t border-line/60 flex flex-col gap-3">
                {post.takeaway && (
                  <p className="font-mono text-[11px] text-accent/90 italic">
                    Takeaway: {post.takeaway}
                  </p>
                )}
                <div className="flex items-center justify-between font-mono text-[10px] text-muted-dim">
                  <span>VERIFIED LINKEDIN POST</span>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted hover:text-accent transition-colors"
                  >
                    <span>Read thread</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
