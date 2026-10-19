---
name: frontend-design
description: Creative frontend engineering, Obsidian Lime visual design principles, typography hierarchy, micro-interactions, and Calm Mode.
---

# Frontend Design & Creative Engineering Skill

## Core Principles
1. **Visual Direction: Option A "Obsidian Lime"**:
   - Technical, tactile, dark chrome, editorial layout.
   - Deep obsidian canvas (`#0A0A0B`), subtle charcoal surface cards (`#131316`), fine borders (`#26262B`).
   - High-energy lime accent (`#C6FF3D`) for focus highlights, status pips, magnetic buttons, and cursor ring triggers.
   - Violet-glow (`#7B4DFF`) restricted strictly to liquid glass refraction / shader chromatic aberration.
2. **Typography Hierarchy**:
   - Display: Clash Display (`clamp(48px, 8vw, 128px)` for H1; `clamp(32px, 5vw, 72px)` for H2).
   - Body: Satoshi (16–18px, generous line height 1.6).
   - Meta / Badges / Tickers / `=>` Lists: JetBrains Mono (12px uppercase, tracking-wider).
   - Pixel Scramble: Departure Mono for loader counter and glitch text resolution.
3. **Motion Rhythm ("One Hero Moment Per Section")**:
   - Section 1 (Hero): Depth sandwich (real text h1 + 2.5D displacement portrait + interactive DOM UI).
   - Section 2 (Stats/Ticker): Counters tick up on entry + velocity-skew marquee.
   - Section 3 (Selected Work): Floating cursor video preview + WebGL ripple route transition.
   - Section 4 (Process): Horizontal scroll scrub + 3D morphing shape.
   - Section 5 (Toolbox): Matter.js physics chip pile + cursor repulsion.
   - Section 6 (Case Studies): Sticky side-navigation + accessible before/after slider.
   - Section 7 (Contact): Directional hover fill on "Let's talk" + live IST offset clock.
4. **Calm Mode**:
   - Explicit toggle in header and command palette.
   - Automatically enabled for users with `prefers-reduced-motion`, `saveData: true`, or low-tier hardware.
   - Disables WebGL canvases, Matter.js physics, text scrambling, and continuous parallax; switches to static editorial layouts with clean 300ms CSS opacity fades.

## Rules
- Every micro-interaction must feel responsive, springy, and intentional.
- Magnetic buttons pull radius ~80px, spring stiffness 180, damping 20.
- Cursor: 10px dot + 36px ring; morphs to "VIEW" over project cards, "DRAG" over physics chips/sliders, hidden on touch screens.

## Do-Nots
- Do not make generic templates with purple glow blobs across the page background.
- Do not use fake terminal animations, fake code rain, or unverified vanity metrics.
