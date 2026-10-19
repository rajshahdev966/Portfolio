import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "live" | "source" | "concept" | "experiment" | "tech" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  variant = "neutral",
  size = "sm",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center font-mono uppercase tracking-wider rounded-full border select-none";

  const sizes = {
    sm: "px-2.5 py-0.5 text-[10px] gap-1.5",
    md: "px-3 py-1 text-xs gap-2",
  };

  const variants = {
    live: "border-accent/40 bg-accent/10 text-accent",
    source: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    concept: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    experiment: "border-purple-500/40 bg-purple-500/10 text-purple-400",
    tech: "border-line bg-surface/80 text-muted hover:border-line-bright hover:text-text",
    neutral: "border-line bg-surface text-muted",
  };

  const dotColors = {
    live: "bg-accent animate-pulse shadow-[0_0_8px_#C6FF3D]",
    source: "bg-blue-400",
    concept: "bg-amber-400",
    experiment: "bg-purple-400",
    tech: "bg-muted",
    neutral: "bg-muted",
  };

  return (
    <span className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotColors[variant])} />}
      <span>{children}</span>
    </span>
  );
}
