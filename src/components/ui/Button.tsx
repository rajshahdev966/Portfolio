"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  withArrow?: boolean;
  magnetic?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      isExternal = false,
      withArrow = false,
      magnetic = true,
      className,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const magneticRef = useMagnetic<HTMLButtonElement>({
      radius: 90,
      strength: 0.3,
    });

    const baseStyles =
      "group relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 select-none cursor-pointer rounded-full";

    const sizeStyles = {
      sm: "h-9 px-4 gap-1.5 text-[11px]",
      md: "h-11 px-6 gap-2 text-xs",
      lg: "h-14 px-8 gap-3 text-sm",
    };

    const variantStyles = {
      primary:
        "bg-accent text-[#0A0A0B] hover:bg-[#B5F522] hover:shadow-[0_0_28px_rgba(198,255,61,0.35)] active:scale-[0.98]",
      secondary:
        "bg-surface text-text border border-line hover:border-accent hover:text-accent active:scale-[0.98]",
      outline:
        "bg-transparent text-text border border-line hover:border-accent hover:text-accent hover:bg-accent/10 active:scale-[0.98]",
      ghost:
        "bg-transparent text-muted hover:text-text hover:bg-surface/50 active:scale-[0.98]",
    };

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    const content = (
      <>
        <span>{children}</span>
        {withArrow && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
        )}
      </>
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={magnetic ? magneticRef : forwardedRef}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
