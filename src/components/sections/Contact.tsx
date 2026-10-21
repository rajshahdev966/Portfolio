"use client";

import React, { useState } from "react";
import { Copy, Check, Mail, ArrowUpRight, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";

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

      </div>
    </section>
  );
}
