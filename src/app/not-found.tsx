"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center select-none">
      <div className="relative mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold px-3 py-1 rounded-full border border-accent/40 bg-accent/5">
          ERROR 404 · ROUTE NOT FOUND
        </span>
      </div>

      <h1 className="text-hero-name font-extrabold uppercase tracking-tight text-text mb-4">
        VOID
      </h1>

      <p className="font-sans text-sm sm:text-base text-muted max-w-md mx-auto mb-8 leading-relaxed">
        The destination you are looking for has moved or does not exist in this project directory.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/" variant="primary" size="md" withArrow>
          Return to home
        </Button>
        <Button href="/#work" variant="outline" size="md">
          Explore projects
        </Button>
      </div>
    </div>
  );
}
