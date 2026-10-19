"use client";

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { formatTimeInTimezone, calculateTimezoneOffsetFromIST } from "@/lib/utils";

export function LiveClock() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [istTime, setIstTime] = useState<string>("");
  const [offsetLabel, setOffsetLabel] = useState<string>("");

  useEffect(() => {
    setMounted(true);

    const updateTimes = () => {
      const now = new Date();
      setIstTime(formatTimeInTimezone(now, "Asia/Kolkata"));
      const offset = calculateTimezoneOffsetFromIST();
      setOffsetLabel(offset.label);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  // Safe SSR placeholder preventing hydration mismatch
  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-2 font-mono text-xs text-muted border border-line rounded-full px-3 py-1.5 bg-surface/40">
        <Clock className="h-3.5 w-3.5 text-accent" />
        <span>Ahmedabad (IST) · Loading time...</span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-2 font-mono text-xs text-muted border border-line rounded-full px-3.5 py-1.5 bg-surface/50">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        <span className="text-text font-medium">{istTime} IST</span>
      </div>
      <span className="text-line-bright">/</span>
      <span className="text-muted-dim text-[11px]">{offsetLabel}</span>
    </div>
  );
}
