"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Command as CommandIcon } from "lucide-react";
import { siteConfig } from "@/content/site";
import { CalmModeToggle } from "@/components/ui/CalmModeToggle";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-line/60 bg-[#0A0A0B]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: RS Monogram Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-text hover:text-accent transition-colors"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-xs font-mono font-bold text-accent transition-all group-hover:border-accent group-hover:shadow-[0_0_12px_rgba(198,255,61,0.3)]">
              RS
            </span>
            <span className="hidden sm:inline-block font-sans text-xs tracking-wider uppercase text-muted group-hover:text-text transition-colors">
              {siteConfig.name}
            </span>
          </Link>

          {/* Center: Desktop Nav Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 bg-surface/50 border border-line rounded-full px-3 py-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.href.startsWith("/#") && pathname === "/" && false);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3.5 py-1 font-mono text-xs uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-muted hover:text-text hover:bg-surface/80"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Availability, Command Palette Pill, Calm Mode & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Availability Dot Pill */}
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-[11px] text-muted">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#C6FF3D]" />
              <span>Available for internships & freelance</span>
            </div>

            {/* Calm Mode Switch */}
            <CalmModeToggle showLabel={false} className="hidden sm:inline-flex" />

            {/* Cmd/Ctrl+K Pill */}
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open Command Palette"
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted hover:border-accent hover:text-text hover:shadow-[0_0_16px_rgba(198,255,61,0.15)] transition-all cursor-pointer"
            >
              <CommandIcon className="h-3 w-3 text-accent" />
              <span className="hidden sm:inline">Cmd+K</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:text-text"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
