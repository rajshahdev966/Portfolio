---
name: r3f-threejs
description: React Three Fiber and Three.js architecture, custom shaders, displacement plane, geometry morphing, and memory disposal.
---

# React Three Fiber & Three.js Skill

## Core Principles
1. **Maximum Two Canvases**:
   - Canvas A: Hero portrait depth-displacement canvas (layered between h1 name and DOM UI).
   - Canvas B: Background canvas (liquid glass blob + process morphing object), mounted lazily after hero idle.
2. **Deterministic Frame Loop**:
   - Set `frameloop="never"` on the Canvas.
   - Advance frames manually via `gl.render()` or `advance()` hooked into the unified `gsap.ticker`.
   - Pause rendering when the canvas is off-screen using `IntersectionObserver`.
3. **Hero Portrait Depth Shader**:
   - Render a plane geometry textured with Raj's portrait cutout and depth displacement map.
   - Point light or uniform cursor tracking (lerped position) creating subtle lime rim lighting and depth tilt.
   - Fallback: Pure CSS 2-layer parallax when WebGL is unsupported or Calm Mode is active.
4. **Resource Disposal**:
   - Explicitly dispose geometries, materials, and textures when components unmount.
   - Lose WebGL context cleanly (`gl.forceContextLoss()`) to prevent GPU leaks.

## Rules
- Defer loading Three.js and R3F until the initial DOM is hydrated and idle.
- Respect Calm Mode, `saveData`, and low-end hardware constraints (`hardwareConcurrency <= 4` or `deviceMemory <= 4`).
- Canvas must be `aria-hidden="true"`; all semantic content must exist in DOM.

## Do-Nots
- Do not run continuous unmetered 60/120fps render loops when user is not interacting or canvas is out of view.
- Do not block first contentful paint (FCP) or largest contentful paint (LCP) with 3D bundle initialization.
