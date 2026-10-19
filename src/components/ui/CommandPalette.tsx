"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  Search,
  ExternalLink,
  Copy,
  Check,
  FolderGit2,
  Compass,
  Sparkles,
  Wind,
  Terminal,
} from "lucide-react";
import { sortedProjects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { isCalm, toggleCalm } = usePrefersCalm();
  const [copied, setCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.canonicalEmail);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const navigateTo = (path: string) => {
    router.push(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 backdrop-blur-md pt-[15vh] px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-[20px] border border-line bg-surface shadow-[0_16px_70px_rgba(0,0,0,0.8)] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="w-full">
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
            <Search className="h-4 w-4 shrink-0 text-muted" />
            <Command.Input
              autoFocus
              placeholder="Type a command, project, or destination..."
              className="w-full bg-transparent font-sans text-sm text-text placeholder:text-muted outline-none"
            />
            <kbd className="hidden sm:inline-block rounded border border-line bg-surface-elevated px-2 py-0.5 font-mono text-[10px] text-muted">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="py-6 text-center font-mono text-xs text-muted">
              No matching commands or projects found.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group
              heading="Navigation"
              className="font-mono text-[10px] uppercase tracking-wider text-muted px-2 py-1.5"
            >
              <Command.Item
                onSelect={() => navigateTo("/")}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-sans text-xs text-text hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors"
              >
                <Compass className="h-3.5 w-3.5 text-muted group-hover:text-accent" />
                <span>Home</span>
                <span className="ml-auto font-mono text-[10px] text-muted">/</span>
              </Command.Item>

              <Command.Item
                onSelect={() => navigateTo("/about")}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-sans text-xs text-text hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-muted group-hover:text-accent" />
                <span>About & Timeline</span>
                <span className="ml-auto font-mono text-[10px] text-muted">/about</span>
              </Command.Item>

              <Command.Item
                onSelect={() => navigateTo("/lab")}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-sans text-xs text-text hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-muted group-hover:text-accent" />
                <span>Interactive Lab Experiments</span>
                <span className="ml-auto font-mono text-[10px] text-muted">/lab</span>
              </Command.Item>
            </Command.Group>

            {/* Projects Group */}
            <Command.Group
              heading="Projects & Case Studies"
              className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted px-2 py-1.5"
            >
              {sortedProjects.map((proj) => (
                <Command.Item
                  key={proj.slug}
                  onSelect={() => navigateTo(`/work/${proj.slug}`)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-sans text-xs text-text hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors"
                >
                  <FolderGit2 className="h-3.5 w-3.5 text-muted" />
                  <span className="font-medium">{proj.title}</span>
                  <span className="text-muted text-[11px] truncate">{proj.subtitle}</span>
                  <span className="ml-auto font-mono text-[10px] text-accent/80">
                    {proj.category}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Actions Group */}
            <Command.Group
              heading="Actions"
              className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted px-2 py-1.5"
            >
              <Command.Item
                onSelect={copyEmail}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-sans text-xs text-text hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-accent" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted" />
                )}
                <span>{copied ? "Copied to clipboard!" : `Copy Email (${siteConfig.canonicalEmail})`}</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  toggleCalm();
                  onClose();
                }}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-sans text-xs text-text hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors"
              >
                {isCalm ? (
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                ) : (
                  <Wind className="h-3.5 w-3.5 text-muted" />
                )}
                <span>{isCalm ? "Disable Calm Mode (Enable 3D & Physics)" : "Enable Calm Mode (Disable 3D & Parallax)"}</span>
              </Command.Item>
            </Command.Group>

            {/* External Links */}
            <Command.Group
              heading="Profiles & Socials"
              className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted px-2 py-1.5"
            >
              <Command.Item
                onSelect={() => {
                  window.open(siteConfig.socials.linkedin, "_blank");
                  onClose();
                }}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-sans text-xs text-text hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 text-muted" />
                <span>LinkedIn Profile</span>
                <span className="ml-auto font-mono text-[10px] text-muted">Verified</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open(siteConfig.socials.github, "_blank");
                  onClose();
                }}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-sans text-xs text-text hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 text-muted" />
                <span>GitHub (@rajshahdev966)</span>
                <span className="ml-auto font-mono text-[10px] text-muted">Code</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open(siteConfig.socials.x, "_blank");
                  onClose();
                }}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-sans text-xs text-text hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 text-muted" />
                <span>X / Twitter</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Guide */}
          <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-muted-dim bg-surface/80">
            <span>Use ↑↓ to navigate, ENTER to select</span>
            <span>ESC to close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
