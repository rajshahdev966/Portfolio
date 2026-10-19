---
name: tailwind-v4
description: Tailwind CSS v4 design token architecture, CSS variable theming, and Obsidian Lime palette integration.
---

# Tailwind CSS v4 Skill

## Core Principles
1. **CSS-First Configuration**:
   - Tailwind v4 uses CSS `@theme` directives instead of legacy `tailwind.config.js`.
   - Define custom color variables, fonts, and animation easings directly in `src/styles/tokens.css` or `globals.css`.
2. **Obsidian Lime Token System**:
   - Background: `--bg: #0A0A0B`
   - Surface: `--surface: #131316`
   - Line / Border: `--line: #26262B`
   - Text Primary: `--text: #F4F4F0`
   - Muted Text: `--muted: #8A8A93`
   - Accent: `--accent: #C6FF3D` (lime)
   - Glow: `--glow: #7B4DFF` (only within glass refraction, never as flat background gradient)
3. **Typography Tokens**:
   - Display: Clash Display (`font-display`)
   - Body: Satoshi (`font-sans`)
   - Mono: JetBrains Mono (`font-mono`)
   - Pixel/Scramble: Departure Mono (`font-pixel`)
4. **Spacing & Radius**:
   - 8px scale: 4, 8, 16, 24, 32, 48, 64, 96, 128, 192.
   - Grid: 12-col desktop, 4-col mobile; gutters 24px desktop, 16px mobile.
   - Radii: 4px (small), 20px (cards), 9999px (pills).

## Rules
- Always use defined theme tokens rather than ad-hoc arbitrary values (no `bg-[#123456]`).
- Dark-mode only by design for Obsidian Lime theme.
- Support high contrast focus rings using `focus-visible:ring-2 focus-visible:ring-accent`.

## Do-Nots
- Do not use Tailwind arbitrary color classes with random uncurated hex values.
- Do not apply heavy backdrop blur or complex box shadows to high-frequency scrolling elements.
