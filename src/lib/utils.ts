import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeInTimezone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

export function calculateTimezoneOffsetFromIST(): {
  hours: number;
  minutes: number;
  isBehind: boolean;
  isSame: boolean;
  label: string;
} {
  // IST is UTC+5:30 (330 minutes)
  const istOffsetMinutes = 330;
  // Visitor's local offset in minutes relative to UTC (getTimezoneOffset returns negative if ahead)
  const visitorOffsetMinutes = -new Date().getTimezoneOffset();
  const diffMinutes = visitorOffsetMinutes - istOffsetMinutes;

  if (Math.abs(diffMinutes) < 15) {
    return {
      hours: 0,
      minutes: 0,
      isBehind: false,
      isSame: true,
      label: "same time as you",
    };
  }

  const isBehind = diffMinutes < 0;
  const absDiff = Math.abs(diffMinutes);
  const hours = Math.floor(absDiff / 60);
  const minutes = absDiff % 60;

  const partH = hours > 0 ? `${hours}h ` : "";
  const partM = minutes > 0 ? `${minutes}m ` : "";
  const direction = isBehind ? "behind" : "ahead of";

  return {
    hours,
    minutes,
    isBehind,
    isSame: false,
    label: `you are ${partH}${partM}${direction} IST`,
  };
}
