---
name: react-performance
description: React performance optimization patterns, memoization rules, render cascade prevention, and bundle size discipline.
---

# React Performance Skill

## Core Principles
1. **Render Budget & Granularity**:
   - Keep state local to the components that consume it.
   - Separate frequently updating state (e.g. cursor coordinates, ticker ticks) from static layout trees.
2. **Memoization & Stable References**:
   - Use `useCallback` and `useMemo` where callbacks or objects are passed to deep child components or animation effects.
   - Avoid creating new object literals or arrow functions inline inside hot render loops.
3. **Heavy Chunk Lazy-Loading**:
   - Defer mounting of off-screen components using `IntersectionObserver`.
   - Lazy-load heavy physics (`matter-js`), 3D canvases (`three`, `@react-three/fiber`), and command palette (`cmdk`) until needed or idle.
4. **Hydration & LCP Safeguards**:
   - Ensure the server-rendered HTML matches initial client markup.
   - For client-only values (e.g. visitor timezone offset in IST clock), render after mount or wrap in a client-only mounting boundary to prevent hydration mismatch.

## Rules
- Profile component renders to ensure no unnecessary re-renders.
- Clean up event listeners, timers, and ResizeObservers in `useEffect` return functions.
- Respect `prefers-reduced-motion` and low-spec device constraints (`hardwareConcurrency <= 4` or `deviceMemory <= 4`).

## Do-Nots
- Do not trigger state updates synchronously inside effects that cause layout thrashing.
- Do not run continuous `requestAnimationFrame` loops in idle background components when off-screen.
