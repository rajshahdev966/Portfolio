---
name: nextjs-app-router
description: Rules, best practices, and patterns for Next.js App Router (React Server Components, metadata, streaming, and static export/generation).
---

# Next.js App Router Skill

## Core Principles
1. **Server Components by Default**:
   - All components in `src/app` and `src/components` are React Server Components (RSC) unless interactivity (hooks, event handlers, browser APIs) is required.
   - Use `'use client'` only at the boundary leaf components.
2. **Data & Content Layer**:
   - Keep project data and case studies typed and validated (e.g. Zod).
   - Use static generation (`generateStaticParams`) for all dynamic routes such as `/work/[slug]`.
3. **Metadata & Head Handling**:
   - Use the Metadata API (`generateMetadata` or static `export const metadata: Metadata`) in `layout.tsx` and `page.tsx`.
   - Never render manual `<head>` tags in App Router pages.
4. **Font Optimization**:
   - Use `next/font/local` or `next/font/google` with CSS variables.
   - Configure `font-display: swap` and preload only critical fonts (Clash Display, Satoshi).
5. **Asset Optimization**:
   - Use `next/image` with explicit width/height, modern formats (AVIF/WebP), and priority only on the above-the-fold hero image.

## Rules
- Enforce TypeScript strict mode with no `any`.
- Keep route JavaScript under budget (< 170 KB gzipped) by dynamically importing heavy client libraries (`Matter.js`, `Three.js`, `R3F`).
- Support static generation with `output: 'export'` or standard App Router deployment targets.

## Do-Nots
- Do not add `'use client'` to page or layout files unless they strictly require client state.
- Do not fetch client-side data when static build-time or server-side data fetching is sufficient.
- Do not import client-only WebGL/Canvas components into Server Components directly without dynamic imports (`next/dynamic` with `{ ssr: false }`).
