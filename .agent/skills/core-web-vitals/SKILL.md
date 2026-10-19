---
name: core-web-vitals
description: Core Web Vitals optimization (LCP < 2.0s, CLS < 0.05, INP < 200ms) on simulated 4G mobile and desktop.
---

# Core Web Vitals Skill

## Core Principles
1. **Largest Contentful Paint (LCP < 2.0s)**:
   - Ensure hero image or hero text is rendered in initial server HTML.
   - Use `priority` attribute on the critical hero image.
   - Self-host fonts using `next/font` with `display: swap`. Preload only Clash Display and Satoshi.
   - Loader screen must never delay LCP or block DOM hydration.
2. **Cumulative Layout Shift (CLS < 0.05)**:
   - Reserve explicit aspect ratio and dimensions on all images, videos, and dynamic containers.
   - Reserve space for custom fonts using `size-adjust` / font fallback metric overrides to eliminate font swap shifts.
   - Position loader and mobile navigation overlays using fixed/absolute layering without pushing page content downward.
3. **Interaction to Next Paint (INP < 200ms)**:
   - Keep JavaScript tasks on the main thread short (< 50ms).
   - Offload heavy operations (physics calculations, WebGL setup) into idle callbacks or requestAnimationFrame slices.
   - Use passive event listeners for wheel, scroll, and touch events.

## Rules
- Measure performance budgets on mobile 4G throttle profile.
- Target Lighthouse performance score >= 90 (>= 95 in Calm Mode).
- Keep initial route JS bundle under 170 KB gzipped.

## Do-Nots
- Do not inject render-blocking external scripts or CSS stylesheets from 3rd party CDNs.
- Do not trigger full layout recalculations on rapid pointermove or scroll events.
