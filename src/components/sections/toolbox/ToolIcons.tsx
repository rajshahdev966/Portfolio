import React from "react";
import {
  Code2,
  Server,
  Database,
  Wrench,
  Brain,
  GraduationCap,
  Layers,
  Terminal,
  Cpu,
  Globe,
  Binary,
  LucideIcon,
} from "lucide-react";

export function CategoryIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  switch (name.toLowerCase()) {
    case "code":
      return <Code2 className={className} />;
    case "server":
      return <Server className={className} />;
    case "database":
      return <Database className={className} />;
    case "wrench":
    case "tool":
      return <Wrench className={className} />;
    case "brain":
      return <Brain className={className} />;
    case "learning":
    case "academic":
      return <GraduationCap className={className} />;
    default:
      return <Layers className={className} />;
  }
}

export function ToolLogo({
  id,
  name,
  icon,
  className = "h-8 w-8",
}: {
  id: string;
  name: string;
  icon?: string;
  className?: string;
}) {
  // If an image URL or public path is provided (/icons/..., .svg, .png, etc.)
  if (icon && (icon.startsWith("/") || icon.startsWith("http") || icon.includes("."))) {
    return (
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt={name}
          className="h-7 w-7 object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  const iconKey = (icon || id).toLowerCase();

  // Next.js - circled N
  if (iconKey === "nextjs" || iconKey === "next.js") {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black border border-white/20 text-white font-display font-extrabold text-sm shadow-md">
        <span>N</span>
      </div>
    );
  }

  // React - atom
  if (iconKey === "react") {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="h-9 w-9 shrink-0 text-[#00D8FF]">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Tailwind - twin wave
  if (iconKey === "tailwind" || iconKey === "tailwindcss") {
    return (
      <svg viewBox="0 0 54 33" className="h-7 w-9 shrink-0 fill-[#38BDF8]">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
      </svg>
    );
  }

  // JavaScript - yellow JS square
  if (iconKey === "javascript" || iconKey === "js") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-end rounded bg-[#F7DF1E] p-1 font-sans font-bold text-[12px] leading-none text-black shadow">
        JS
      </div>
    );
  }

  // HTML5 / CSS3 - orange shield 5
  if (iconKey === "html" || iconKey === "htmlcss" || iconKey === "html5") {
    return (
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#E34F26] text-white font-sans font-black text-sm shadow">
        <span>5</span>
      </div>
    );
  }

  // Redux Toolkit - purple loop
  if (iconKey === "redux") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 text-[#764ABC]" fill="currentColor">
        <path d="M12.97 2.59a3.07 3.07 0 0 0-3.32.74L8.43 4.55a4.29 4.29 0 0 0-.82 1.25 5.51 5.51 0 0 0-2.42.3 5.4 5.4 0 0 0-2.6 1.76 5.17 5.17 0 0 0-.91 4.54 5.2 5.2 0 0 0 2.21 3.2 4.2 4.2 0 0 0-.25 1.48 4.4 4.4 0 0 0 1.23 3.07 4.54 4.54 0 0 0 3.2 1.34 4.6 4.6 0 0 0 2-.45 5.4 5.4 0 0 0 2.62-1.78 5.17 5.17 0 0 0 .91-4.54 5.2 5.2 0 0 0-2.21-3.2 4.2 4.2 0 0 0 .25-1.48 4.4 4.4 0 0 0-1.23-3.07 4.54 4.54 0 0 0-3.2-1.34 4.6 4.6 0 0 0-2 .45 5.4 5.4 0 0 0-2.62 1.78 5.17 5.17 0 0 0-.91 4.54 5.2 5.2 0 0 0 2.21 3.2" opacity="0.3" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <ellipse cx="12" cy="12" rx="8" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="8" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(-30 12 12)" />
      </svg>
    );
  }

  // Node.js
  if (iconKey === "node" || iconKey === "nodejs") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#1A2E1C] border border-[#5FA04E]/40 text-[#5FA04E] font-mono font-bold text-xs">
        JS
      </div>
    );
  }

  // SQL / Database
  if (iconKey === "sql") {
    return <Database className="h-7 w-7 text-[#00E5FF] shrink-0" />;
  }

  // Git / GitHub
  if (iconKey === "git" || iconKey === "github") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#201511] border border-[#F05032]/40 text-[#F05032]">
        <Binary className="h-4 w-4" />
      </div>
    );
  }

  // Java / Algorithms
  if (iconKey === "java") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#2D1B17] border border-[#E76F00]/40 text-[#E76F00] font-mono font-bold text-xs">
        ☕
      </div>
    );
  }

  // DevOps / Terminal
  if (iconKey === "terminal" || iconKey === "devops") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#1B1226] border border-[#A855F7]/40 text-[#A855F7]">
        <Terminal className="h-4 w-4" />
      </div>
    );
  }

  // Default initials badge
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#18181C] border border-white/10 font-mono text-xs font-bold text-accent">
      {initials}
    </div>
  );
}
