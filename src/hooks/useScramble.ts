"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePrefersCalm } from "./usePrefersCalm";

const GLYPHS = "0123456789_/-*#$@!~+<>[]{}";

export function useScramble(
  targetText: string,
  options: {
    duration?: number;
    delay?: number;
    autoStart?: boolean;
    onComplete?: () => void;
  } = {}
) {
  const { duration = 800, delay = 0, autoStart = true, onComplete } = options;
  const { isCalm } = usePrefersCalm();
  const [displayText, setDisplayText] = useState<string>(isCalm ? targetText : "");
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (isCalm) {
      setDisplayText(targetText);
      onComplete?.();
      return;
    }

    setIsScrambling(true);
    const length = targetText.length;
    const startTime = Date.now();
    const intervalTime = 35; // ~30 fps updates

    if (timerRef.current) clearInterval(timerRef.current);

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Number of resolved characters
      const resolvedCount = Math.floor(progress * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (targetText[i] === " " || targetText[i] === "\n") {
          result += targetText[i];
        } else if (i < resolvedCount) {
          result += targetText[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(result);

      if (progress >= 1) {
        clearInterval(timerRef.current!);
        setDisplayText(targetText);
        setIsScrambling(false);
        onComplete?.();
      }
    };

    timerRef.current = setInterval(update, intervalTime);
  }, [targetText, duration, isCalm, onComplete]);

  useEffect(() => {
    if (isCalm) {
      setDisplayText(targetText);
      return;
    }

    if (autoStart) {
      const timeout = setTimeout(() => {
        startScramble();
      }, delay);
      return () => {
        clearTimeout(timeout);
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [autoStart, delay, startScramble, isCalm, targetText]);

  return { displayText, isScrambling, startScramble };
}
