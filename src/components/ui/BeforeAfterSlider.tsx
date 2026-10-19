"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Approach 01 / Before",
  afterLabel = "Approach 03 / Optimized",
  aspectRatio = "aspect-video",
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState<number>(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setPosition(percent);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    handleMove(e.clientX);
    const onPointerMove = (moveEvent: PointerEvent) => {
      handleMove(moveEvent.clientX);
    };
    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      className={cn(
        "relative select-none overflow-hidden rounded-[20px] border border-line bg-surface cursor-ew-resize group",
        aspectRatio,
        className
      )}
      data-cursor="drag"
    >
      {/* After Image (Full Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterLabel}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute top-4 right-4 z-10 rounded-full border border-line bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent backdrop-blur-md">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped Left Layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="relative h-full w-full">
          {/* We expand the inner image to match container width to prevent stretching */}
          <div
            className="absolute inset-0"
            style={{
              width: containerRef.current
                ? `${containerRef.current.offsetWidth}px`
                : "100%",
            }}
          >
            <Image
              src={beforeSrc}
              alt={beforeLabel}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
          <div className="absolute top-4 left-4 z-10 rounded-full border border-line bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-text backdrop-blur-md">
            {beforeLabel}
          </div>
        </div>
      </div>

      {/* Divider Bar & Accessible Handle */}
      <div
        style={{ left: `${position}%` }}
        className="absolute top-0 bottom-0 z-20 w-[2px] -translate-x-1/2 bg-accent shadow-[0_0_12px_#C6FF3D]"
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Image comparison position"
          aria-valuenow={position}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#0A0A0B] bg-accent text-[#0A0A0B] shadow-[0_0_16px_rgba(198,255,61,0.5)] transition-transform group-hover:scale-110 focus-visible:ring-4 focus-visible:ring-accent"
        >
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
