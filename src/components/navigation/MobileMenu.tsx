"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Search } from "lucide-react";
import { siteConfig } from "@/content/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  onOpenSearch?: () => void;
}

export function MobileMenu({ isOpen, onClose, links, onOpenSearch }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col bg-[#0A0A0B]/95 backdrop-blur-2xl px-6 py-6"
    >
      {/* Top Controls */}
      <div className="flex items-center justify-between border-b border-line/60 pb-5">
        <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
          Menu · Navigation
        </span>
        <button
          onClick={onClose}
          aria-label="Close Menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-text hover:border-accent"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Staggered Links */}
      <nav className="flex flex-1 flex-col justify-center gap-4 py-8">
        {links.map((link, idx) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="group flex items-center justify-between py-2 border-b border-line/30"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-muted-dim">
                0{idx + 1}
              </span>
              <span className="font-display text-3xl font-bold tracking-tight text-text group-hover:text-accent group-hover:translate-x-2 transition-all">
                {link.label}
              </span>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted transition-transform group-hover:text-accent group-hover:rotate-45" />
          </Link>
        ))}

        {/* Search Item that opens Command Palette */}
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="group flex items-center justify-between py-2 border-b border-line/30 text-left"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-accent">
                0{links.length + 1}
              </span>
              <span className="font-display text-3xl font-bold tracking-tight text-accent group-hover:translate-x-2 transition-all">
                SEARCH
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase text-muted bg-surface px-2 py-0.5 rounded border border-line">
                ⌘K
              </span>
              <Search className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
            </div>
          </button>
        )}
      </nav>

      {/* Footer Info */}
      <div className="flex flex-col gap-4 border-t border-line/60 pt-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-accent font-semibold tracking-wider uppercase">
            Raj Shah · Portfolio
          </span>
          <span className="font-mono text-[11px] text-muted">
            Ahmedabad, India
          </span>
        </div>
        <p className="font-sans text-xs text-muted leading-relaxed">
          {siteConfig.positioningStatement}
        </p>
      </div>
    </div>
  );
}
