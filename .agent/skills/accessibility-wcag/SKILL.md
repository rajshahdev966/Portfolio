---
name: accessibility-wcag
description: WCAG 2.2 Level AA compliance guidelines, keyboard navigation, ARIA semantics, focus management, and screen reader UX.
---

# Accessibility (WCAG 2.2 AA) Skill

## Core Principles
1. **Semantic Landmarks & Structure**:
   - Single `<h1>` per page.
   - Logical heading hierarchy (`h1` -> `h2` -> `h3`).
   - Standard landmarks: `<header>`, `<main id="main-content">`, `<nav>`, `<footer>`.
   - Skip to main content link: `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>`.
2. **Keyboard Navigation & Focus Traps**:
   - Every interactive element (buttons, cards, links, sliders, palette) must be keyboard navigable via Tab / Shift+Tab / Enter / Space.
   - Custom focus ring: high-contrast lime outline (`focus-visible:ring-2 focus-visible:ring-[#C6FF3D] focus-visible:outline-none`).
   - Focus trap and Escape key listener on command palette and mobile navigation.
3. **Contrast & Sizing**:
   - Minimum text contrast ratio: 4.5:1 for normal text against dark `#0A0A0B` / `#131316` backgrounds.
   - Touch targets: minimum 44x44px on mobile viewports.
4. **Accessible Custom Components**:
   - Before/After comparison slider: `role="slider"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, keyboard arrow keys support.
   - Draggable carousels: accessible next/previous arrow buttons alongside touch/mouse drag.
   - Custom cursor: hidden on touch devices and screen readers; must not interfere with native click targets.
   - Canvas / WebGL elements: marked `aria-hidden="true"` with full text/image equivalents in the DOM.

## Rules
- Test pages using `@axe-core/playwright` or axe DevTools with zero critical/serious violations.
- Provide descriptive `alt` text for all informative images and `alt=""` for purely decorative illustrations.

## Do-Nots
- Do not disable focus outlines (`outline: none`) without providing a visible `:focus-visible` ring.
- Do not trap user focus in a loop without an accessible Escape or Close mechanism.
