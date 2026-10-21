"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Monitor, Copy, Check, ArrowRight, Smartphone } from "lucide-react";

export function MobileDeclineModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkViewport = () => {
      // Show on mobile phones (< 768px). Tablets (>= 768px) and Desktops are good.
      const isMobileScreen = window.innerWidth < 768;
      const alreadyDismissed = sessionStorage.getItem("portfolio_mobile_decline_dismissed");

      if (isMobileScreen && !alreadyDismissed) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem("portfolio_mobile_decline_dismissed", "true");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-decline-title"
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-[#0A0A0B]/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-line-bright bg-[#0F0F12] p-6 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
          >
            {/* Ambient Lime Glow in Background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/15 blur-3xl"
            />

            {/* Header Telemetry Badge */}
            <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="tracking-widest uppercase text-accent font-semibold">
                  VIEWPORT ADVISORY
                </span>
              </div>
              <span className="text-muted-dim uppercase">DEV_01</span>
            </div>

            {/* Icon Graphic */}
            <div className="my-6 flex items-center justify-center gap-3">
              {/* Phone with slash/cross */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#16161B] text-muted-dim">
                <Smartphone className="h-7 w-7 opacity-60" />
                <span className="absolute inset-x-2 top-1/2 h-[1.5px] -rotate-45 bg-red-500/80" />
              </div>

              {/* Arrow */}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-accent"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>

              {/* Workstation Desktop Target */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/40 bg-[#14190D] text-accent shadow-[0_0_24px_rgba(198,255,61,0.25)]">
                <Monitor className="h-7 w-7" />
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center">
              <h2
                id="mobile-decline-title"
                className="font-display text-xl font-bold uppercase tracking-tight text-text sm:text-2xl"
              >
                Desktop Experience Recommended
              </h2>

              <p className="mt-3 font-sans text-xs sm:text-sm text-muted leading-relaxed">
                This portfolio features custom physics, cursor-following mechanics, and 
                multi-layer spatial graphics designed specifically for{" "}
                <span className="text-text font-medium">desktop, laptop, or tablet</span> screens.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2.5">
              {/* Primary Action: Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl border border-accent/60 bg-accent py-3 px-4 font-sans text-xs font-semibold uppercase tracking-wider text-[#0A0A0B] shadow-[0_0_20px_rgba(198,255,61,0.25)] transition-all hover:bg-accent-hover hover:border-accent active:scale-[0.98] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 stroke-[2.5]" />
                    <span>Link Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Link to Open on PC</span>
                  </>
                )}
              </button>

              {/* Secondary Dismissal */}
              <button
                type="button"
                onClick={handleDismiss}
                className="flex w-full items-center justify-center py-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-dim transition-colors hover:text-text cursor-pointer"
              >
                Continue on mobile anyway ↳
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
export default MobileDeclineModal;
