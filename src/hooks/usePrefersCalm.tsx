"use client";

import React, { createContext, useContext } from "react";

interface CalmModeContextType {
  isCalm: boolean;
  toggleCalm: () => void;
  setCalm: (value: boolean) => void;
  reason: "default_off";
}

const CalmModeContext = createContext<CalmModeContextType>({
  isCalm: false,
  toggleCalm: () => {},
  setCalm: () => {},
  reason: "default_off",
});

export function CalmModeProvider({ children }: { children: React.ReactNode }) {
  // Calm mode is completely disabled across the site
  return (
    <CalmModeContext.Provider
      value={{
        isCalm: false,
        toggleCalm: () => {},
        setCalm: () => {},
        reason: "default_off",
      }}
    >
      {children}
    </CalmModeContext.Provider>
  );
}

export function usePrefersCalm() {
  return useContext(CalmModeContext);
}
