"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface CalmModeContextType {
  isCalm: boolean;
  toggleCalm: () => void;
  setCalm: (value: boolean) => void;
  reason: "auto_reduced_motion" | "auto_low_spec" | "user_toggle" | "default_off";
}

const CalmModeContext = createContext<CalmModeContextType>({
  isCalm: false,
  toggleCalm: () => {},
  setCalm: () => {},
  reason: "default_off",
});

export function CalmModeProvider({ children }: { children: React.ReactNode }) {
  const [isCalm, setIsCalm] = useState<boolean>(false);
  const [reason, setReason] = useState<CalmModeContextType["reason"]>("default_off");

  useEffect(() => {
    // 1. Check user manual override in localStorage
    const saved = localStorage.getItem("raj_shah_calm_mode");
    if (saved !== null) {
      setIsCalm(saved === "true");
      setReason("user_toggle");
      return;
    }

    // 2. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsCalm(true);
      setReason("auto_reduced_motion");
      return;
    }

    // 3. Check saveData network flag
    const nav = navigator as unknown as {
      connection?: { saveData?: boolean };
      hardwareConcurrency?: number;
      deviceMemory?: number;
    };
    if (nav.connection?.saveData) {
      setIsCalm(true);
      setReason("auto_low_spec");
      return;
    }

    // 4. Check low-end device constraints
    const lowCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
    if (lowCores || lowMem) {
      setIsCalm(true);
      setReason("auto_low_spec");
      return;
    }
  }, []);

  const setCalm = useCallback((value: boolean) => {
    setIsCalm(value);
    setReason("user_toggle");
    localStorage.setItem("raj_shah_calm_mode", String(value));
    if (value) {
      document.documentElement.classList.add("calm-mode");
    } else {
      document.documentElement.classList.remove("calm-mode");
    }
  }, []);

  const toggleCalm = useCallback(() => {
    setCalm(!isCalm);
  }, [isCalm, setCalm]);

  return (
    <CalmModeContext.Provider value={{ isCalm, toggleCalm, setCalm, reason }}>
      {children}
    </CalmModeContext.Provider>
  );
}

export function usePrefersCalm() {
  return useContext(CalmModeContext);
}
