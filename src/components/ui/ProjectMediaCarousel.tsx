"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { MediaPendingCard } from "@/components/ui/MediaPendingCard";
import { cn } from "@/lib/utils";

export interface ScreenshotItem {
  src: string;
  caption?: string;
}

interface ProjectMediaCarouselProps {
  screenshots?: ScreenshotItem[];
  poster?: string;
  projectTitle?: string;
  className?: string;
}

export function ProjectMediaCarousel({
  screenshots = [],
  poster,
  projectTitle,
  className,
}: ProjectMediaCarouselProps) {
  // Track images that failed to load to prevent broken UI
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Collect all potential displayable images
  const rawItems: ScreenshotItem[] = [];

  if (screenshots && screenshots.length > 0) {
    rawItems.push(...screenshots.filter((s) => Boolean(s?.src)));
  } else if (poster && poster !== "/projects/placeholder.webp") {
    rawItems.push({ src: poster, caption: `${projectTitle || "Project"} Overview` });
  }

  // Filter out any known failed images
  const items = rawItems.filter((item) => !failedImages[item.src]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const total = items.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= total && total > 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex, total]);

  // Keyboard navigation when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // If no images exist or all failed, show the clean MediaPendingCard
  if (total === 0) {
    return (
      <MediaPendingCard
        projectTitle={projectTitle}
        assetName={poster}
        aspectRatio="video"
        note="Visual media verification in progress. Core technical architecture evidenced in case study."
        className={className}
      />
    );
  }

  const activeItem = items[currentIndex] || items[0];
  const isExternal =
    activeItem.src.startsWith("http://") || activeItem.src.startsWith("https://");

  return (
    <div className={cn("flex flex-col gap-3 select-none", className)}>
      {/* Main Viewport */}
      <div className="group relative w-full aspect-video overflow-hidden rounded-[20px] border border-line bg-surface/50 shadow-2xl">
        {/* Active Image */}
        <div className="relative w-full h-full">
          <Image
            key={activeItem.src + currentIndex}
            src={activeItem.src}
            alt={activeItem.caption || `${projectTitle || "Project"} screenshot ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            priority={currentIndex === 0}
            unoptimized={isExternal}
            onError={() => {
              setFailedImages((prev) => ({ ...prev, [activeItem.src]: true }));
            }}
            className="object-contain w-full h-full transition-opacity duration-300"
          />
        </div>

        {/* Top Header Badge: Counter */}
        {total > 1 && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0B]/80 backdrop-blur-md border border-line font-mono text-[11px] text-text font-semibold">
            <ImageIcon className="h-3.5 w-3.5 text-accent" />
            <span>
              {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        )}

        {/* Navigation Arrows (visible if > 1 image) */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-[#0A0A0B]/75 backdrop-blur-md text-text transition-all hover:bg-accent hover:text-[#0A0A0B] hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-[#0A0A0B]/75 backdrop-blur-md text-text transition-all hover:bg-accent hover:text-[#0A0A0B] hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Bottom Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0A0B]/70 backdrop-blur-md border border-line/60">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200 cursor-pointer",
                    currentIndex === idx
                      ? "w-6 bg-accent"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Caption Bar */}
      {activeItem.caption && (
        <div className="flex items-center justify-between px-2 text-xs font-mono text-muted">
          <p className="line-clamp-2 text-muted-dim leading-relaxed">
            <span className="text-accent font-semibold mr-2">↳</span>
            {activeItem.caption}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectMediaCarousel;