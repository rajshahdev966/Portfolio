"use client";

import React from "react";
import { Sparkles, Wind } from "lucide-react";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";
import { cn } from "@/lib/utils";

interface CalmModeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export function CalmModeToggle({ showLabel = true, className }: CalmModeToggleProps) {
  const { isCalm, toggleCalm } = usePrefersCalm();

  return (
    <button
      onClick={toggleCalm}
      aria-label={isCalm ? "Disable Calm Mode (Enable 3D & Physics)" : "Enable Calm Mode (Disable 3D & Physics)"}
      title={isCalm ? "Calm Mode is ON: 3D, physics, and parallax are paused." : "Calm Mode is OFF: Full WebGL and dynamic physics enabled."}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:border-accent hover:bg-surface active:scale-95 cursor-pointer",
        isCalm ? "border-accent/60 bg-accent/10 text-accent" : "text-muted hover:text-text",
        className
      )}
    >
      {isCalm ? (
        <Wind className="h-3.5 w-3.5 text-accent" />
      ) : (
        <Sparkles className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent" />
      )}
      {showLabel && (
        <span>
          {isCalm ? "Calm Mode: ON" : "Calm Mode"}
        </span>
      )}
    </button>
  );
}
