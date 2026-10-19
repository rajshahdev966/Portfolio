"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { siteConfig } from "@/content/site";
import { LiveClock } from "@/components/ui/LiveClock";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line bg-surface/30 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-line">
          {/* Col 1: Bio & Positioning (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-surface font-mono text-xs font-bold text-accent">
                RS
              </span>
              <span className="font-display text-lg font-bold text-text">
                {siteConfig.name}
              </span>
            </div>
            <p className="font-sans text-xs text-muted leading-relaxed max-w-sm">
              {siteConfig.positioningStatement}
            </p>
            <div className="pt-2">
              <LiveClock />
            </div>
          </div>

          {/* Col 2: Navigation Sitemap (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <h5 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-1">
              Index
            </h5>
            <Link href="/" className="font-sans text-xs text-muted hover:text-text transition-colors">
              Home
            </Link>
            <Link href="/about" className="font-sans text-xs text-muted hover:text-text transition-colors">
              About & Experience
            </Link>
            <Link href="/lab" className="font-sans text-xs text-muted hover:text-text transition-colors">
              Interactive Lab
            </Link>
            <Link href="/#work" className="font-sans text-xs text-muted hover:text-text transition-colors">
              Selected Work
            </Link>
            <Link href="/#process" className="font-sans text-xs text-muted hover:text-text transition-colors">
              Process Methodology
            </Link>
            <Link href="/#contact" className="font-sans text-xs text-muted hover:text-text transition-colors">
              Contact & Enquiries
            </Link>
          </div>

          {/* Col 3: Social & Verified Links (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-1">
              Profiles & Verification
            </h5>
            <div className="flex flex-col gap-2 font-mono text-xs text-muted">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn /rajshah-dev (Canonical)</span>
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub /rajshahdev966</span>
              </a>
              <a
                href={siteConfig.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Twitter className="h-3.5 w-3.5" />
                <span>X (Twitter)</span>
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>Instagram</span>
              </a>
              <a
                href={`mailto:${siteConfig.canonicalEmail}`}
                className="flex items-center gap-2 text-text hover:text-accent transition-colors pt-1"
              >
                <Mail className="h-3.5 w-3.5 text-accent" />
                <span>{siteConfig.canonicalEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Integrity Note & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-mono text-muted">
          <p>
            © {new Date().getFullYear()} Raj Shah. Built with Next.js, Obsidian Lime & strict factual integrity.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-muted hover:border-accent hover:text-accent transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
