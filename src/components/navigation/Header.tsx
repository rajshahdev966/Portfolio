"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "WORK", href: "/#work", sectionId: "work" },
  { label: "PROCESS", href: "/#process", sectionId: "process" },
  { label: "LAB", href: "/lab", sectionId: "lab" },
  { label: "ABOUT", href: "/about", sectionId: "about" },
  { label: "CONTACT", href: "/#contact", sectionId: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("");
  const lastScrollY = useRef(0);

  // Keyboard shortcut listener for Cmd/Ctrl+K and "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 90) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Scroll-spy active section detection
      if (pathname === "/") {
        const sections = ["contact", "process", "work"];
        let current = "";
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              current = id;
              break;
            }
          }
        }
        setActiveSection(current);
      } else if (pathname === "/about") {
        setActiveSection("about");
      } else if (pathname === "/lab") {
        setActiveSection("lab");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-out py-6 px-6 sm:px-8 lg:px-12",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
        style={{
          background:
            "linear-gradient(to bottom, rgba(10, 10, 11, 0.65) 0%, rgba(10, 10, 11, 0.25) 60%, transparent 100%)",
        }}
      >
        <div className="mx-auto flex items-center justify-between max-w-[1600px]">
          {/* Block 1: Monogram + Name Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2 select-none"
            aria-label="Raj Shah Home"
          >
            <span className="font-display font-bold text-accent text-lg tracking-tight">
              RS
            </span>
            <span className="font-display font-semibold text-lg tracking-[-0.01em] text-text">
              RAJ SHAH
            </span>
          </Link>

          {/* Block 2 (Desktop): Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.sectionId;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative flex items-center gap-1.5 font-sans font-medium text-sm uppercase tracking-[0.08em] select-none cursor-pointer py-1"
                >
                  {/* Active Lime Dot */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                    />
                  )}

                  {/* Text Roll Micro-Animation */}
                  <span className="roll-container text-muted group-hover:text-text transition-colors">
                    <span className={cn("roll-text", isActive && "text-text font-semibold")}>
                      {link.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="roll-text text-text"
                    >
                      {link.label}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Right: Menu Text Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-text hover:text-accent transition-colors cursor-pointer py-1 px-2"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Global Command Palette (Cmd/Ctrl+K and "/") */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* Mobile Full-Screen Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
        onOpenSearch={() => {
          setMobileMenuOpen(false);
          setPaletteOpen(true);
        }}
      />
    </>
  );
}
