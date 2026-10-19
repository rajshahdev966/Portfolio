import React from "react";
import { cn } from "@/lib/utils";

interface MediaPendingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  assetName?: string;
  projectTitle?: string;
  aspectRatio?: "video" | "square" | "wide";
  note?: string;
}

export function MediaPendingCard({
  assetName,
  projectTitle,
  aspectRatio = "video",
  note,
  className,
  ...props
}: MediaPendingCardProps) {
  const aspectStyles = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[21/9]",
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-[20px] border border-line bg-surface/50 p-6 text-center select-none",
        aspectStyles[aspectRatio],
        className
      )}
      {...props}
    >
      {/* Background Subtle Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-2.5 max-w-sm">
        <span className="font-mono text-[11px] uppercase tracking-widest text-accent font-semibold px-2.5 py-1 rounded border border-accent/30 bg-accent/5">
          [ MEDIA PENDING ]
        </span>
        {projectTitle && (
          <h4 className="font-display text-base font-semibold text-text tracking-tight">
            {projectTitle}
          </h4>
        )}
        <p className="font-sans text-xs text-muted leading-relaxed">
          {note ||
            "Production recording pending. Verified against actual codebase architecture."}
        </p>
        {assetName && (
          <code className="mt-1 font-mono text-[10px] text-muted-dim">
            asset: {assetName}
          </code>
        )}
      </div>
    </div>
  );
}
