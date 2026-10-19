"use client";

import React, { useState } from "react";
import { Copy, Check, Mail, ArrowUpRight, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { LiveClock } from "@/components/ui/LiveClock";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.canonicalEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact & Collaboration"
      className="relative z-20 bg-[#0A0A0B] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16 border-b border-line pb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>[ 06 / 06 ] · GET IN TOUCH</span>
          </div>
          <LiveClock />
        </div>

        {/* Huge Interactive "LET'S TALK" Headline with Directional Fill */}
        <div className="relative mb-20 overflow-hidden rounded-[32px] border border-line bg-surface/30 p-8 sm:p-16 lg:p-20 text-center group transition-colors duration-300 hover:border-accent">
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-dim mb-4">
              HAVE AN OPPORTUNITY OR PROPOSAL?
            </span>

            <h2 className="text-hero-name font-extrabold uppercase tracking-tighter text-text group-hover:text-accent transition-colors duration-300">
              LET'S TALK
            </h2>

            <p className="font-sans text-sm sm:text-base text-muted max-w-xl mx-auto mt-6 leading-relaxed">
              Whether you are an engineering team looking for a high-velocity intern or a business seeking a bespoke web build, my inbox is always open.
            </p>

            {/* Main Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                href={`mailto:${siteConfig.canonicalEmail}?subject=Engineering%20Inquiry`}
                variant="primary"
                size="lg"
                withArrow
                magnetic
              >
                Send an email
              </Button>

              <button
                onClick={copyEmail}
                className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-line bg-surface px-8 font-mono text-xs uppercase tracking-wider font-semibold text-text hover:border-accent hover:text-accent transition-all active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-accent" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-muted group-hover:text-accent" />
                    <span>Copy email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Two Clear Audience Routes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Route 1: Hiring Teams */}
          <div className="rounded-[24px] border border-line bg-surface/40 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold block mb-2">
                ROUTE A
              </span>
              <h3 className="font-display text-2xl font-bold text-text mb-3">
                For Hiring Teams
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed mb-6">
                Seeking a software engineering intern who brings strong computer science foundations, clean frontend architecture (Next.js, React, FSD), API discipline, and product taste.
              </p>
            </div>

            <div className="pt-6 border-t border-line/60 flex items-center justify-between">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline font-semibold"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <span className="font-mono text-[10px] text-muted-dim">Available 2026</span>
            </div>
          </div>

          {/* Route 2: Project Enquiries */}
          <div className="rounded-[24px] border border-line bg-surface/40 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold block mb-2">
                ROUTE B
              </span>
              <h3 className="font-display text-2xl font-bold text-text mb-3">
                For Project Enquiries
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed mb-6">
                Planning an interactive digital experience, developer tool, or lean serverless portal? Let's discuss scope, constraints, and architecture.
              </p>
            </div>

            <div className="pt-6 border-t border-line/60 flex items-center justify-between">
              <a
                href={`mailto:${siteConfig.canonicalEmail}?subject=Freelance%20Project%20Brief`}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline font-semibold"
              >
                <span>Discuss Project Scope</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <span className="font-mono text-[10px] text-muted-dim">Fixed & Milestones</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
