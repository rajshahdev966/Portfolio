---
name: motion
description: Motion (Framer Motion / motion/react) guidelines for layout transitions, mount/exit animations, hover physics, and modals.
---

# Motion (motion/react) Skill

## Core Principles
1. **Scope of Motion**:
   - Use `motion/react` specifically for:
     - Component mount/unmount (`AnimatePresence`).
     - Layout animations (`layout`, `layoutId`).
     - Interactive state transitions: hover, tap, focus.
     - Command palette (`cmdk`) modal backdrop and dialog transitions.
     - Mobile navigation drawer and staggered link reveals.
2. **Spring Physics & Easings**:
   - Magnetic buttons: stiffness 180, damping 20.
   - Reveal easing: `[0.16, 1, 0.3, 1]` (expo-out).
   - Page transitions: `[0.76, 0, 0.24, 1]` (quart-in-out).
   - Micro-interactions: 150ms.
3. **Reduced Motion Adaptation**:
   - Query `useReducedMotion()`.
   - Swap physical slide/scale transitions with subtle opacity fades (300ms) when reduced motion is preferred.

## Rules
- Import from `motion/react`.
- Never animate properties controlled by GSAP on the same DOM element.
- Set `will-change: transform` only during active animations and remove afterward.

## Do-Nots
- Do not animate non-composited CSS properties like `width`, `height`, `margin`, `padding`, or `border-width`.
- Do not nest multiple layoutId animations that trigger recursive layout thrashing.
