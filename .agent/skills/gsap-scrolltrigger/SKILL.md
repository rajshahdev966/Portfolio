---
name: gsap-scrolltrigger
description: GSAP, ScrollTrigger, SplitText, and DrawSVG patterns with Lenis smooth scroll and ticker synchronization.
---

# GSAP & ScrollTrigger Skill

## Core Principles
1. **Single Unified RAF Loop**:
   - Drive Lenis smooth scroll and ScrollTrigger directly from `gsap.ticker`.
   - Update ScrollTrigger synchronously via `lenis.on('scroll', ScrollTrigger.update)`.
   - Add Lenis raf to ticker: `gsap.ticker.add((time) => { lenis.raf(time * 1000); })`.
   - Set `gsap.ticker.lagSmoothing(0)`.
2. **Context & Cleanup**:
   - Always wrap GSAP animations in `gsap.context()` inside `useEffect` or `useGSAP`.
   - Revert context in component unmount: `ctx.revert()`.
3. **ScrollTrigger Pinning & Scrubbing**:
   - Use ScrollTrigger pinned horizontal scroll for the Process section (steps 01–05).
   - Use `anticipatePin: 1` and clean container boundaries to prevent layout jumps.
4. **DrawSVG & Signature**:
   - Animate vector strokes sequentially with realistic draw-in easing.
   - Fallback to CSS stroke-dashoffset or masked opacity for devices with reduced motion.

## Rules
- Only animate GPU-accelerated properties: `transform` (`x`, `y`, `scale`, `rotation`), `opacity`, and `clip-path`.
- Never animate `width`, `height`, `top`, `left`, `margin`, or `box-shadow` on scroll.
- Never animate the same property of an element using both GSAP and Motion.

## Do-Nots
- Do not create ScrollTriggers without killing or reverting them on unmount.
- Do not run unpinned heavy scrub calculations when off-screen.
