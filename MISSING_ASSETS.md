# Missing Assets Audit

This document tracks all required media assets for the Raj Shah portfolio. In accordance with the non-negotiable Project Integrity Rules, **no synthetic or AI-generated mock product screenshots will ever be used**. Where media is missing, the UI renders a crisp, typographic "Media Pending" card.

## 1. Hero Assets (`public/hero/`)
- [x] `public/hero/raj_shah_hero_image.png` (Present: 1.83 MB PNG portrait cutout)
- [ ] `public/hero/raj_shah_hero_depth.png` (Missing: Grayscale depth/displacement map for the Three.js 2.5D shader plane. Fallback: CSS 2-layer parallax when depth map is absent or in calm mode)

## 2. Signature Assets (`public/signature/`)
- [x] `public/signature/signature_static.svg` (Present: 15.8 KB SVG filled path silhouette)
- [ ] `public/signature/signature.svg` (Missing: Vector stroked path format required for GSAP DrawSVG stroke-by-stroke animation. Fallback: SVG stroke dasharray mask / clipped silhouette reveal)

## 3. Project Previews & Case Study Media (`public/projects/<slug>/`)
The following media files are pending from real screen recordings, production screenshots, or architectural diagrams:

### Flagship Projects (Home Page Rows)
1. **ARC (`public/projects/arc/`)**
   - [ ] `preview.mp4` (Floating loop video for hover row, 16:9, muted)
   - [ ] `poster.webp` (Video poster fallback)
   - [ ] `approach-studio.webp` (Screenshots showing Approach 01/02/03 side-by-side Monaco editors)
   - [ ] `desk-ui.webp` (Neo-brutalist tactile workspace interface)

2. **DEVIntel (`public/projects/devintel/`)**
   - [ ] `preview.mp4` (Floating loop video for hover row)
   - [ ] `poster.webp`
   - [ ] `heatmap-quantiles.webp` (52-week contribution heatmap generated from GitHub API byte counts)
   - [ ] `architecture-diagram.webp` (FSD module diagram: /api, /hooks, /ui, /state)

3. **Alchemy Stories (`public/projects/alchemy-stories/`)**
   - [ ] `preview.mp4` (Editorial layout & WebAR 3D viewer loop)
   - [ ] `poster.webp`
   - [ ] `webar-demo.webp` (Google model-viewer AR handoff screenshot)
   - [ ] `editorial-layout.webp` (Cyanotype art storytelling layout)

4. **Tunnel Flap (`public/projects/tunnel-flap/`)**
   - [ ] `preview.mp4` (DOM-based game loop in action)
   - [ ] `poster.webp`
   - [ ] `object-pool-diagram.webp` (Diagram/screenshot of 8-node DOM pool recycling)

5. **GHAR (`public/projects/ghar/`)**
   - [ ] `preview.mp4` (Story-driven comfort food layout & animations)
   - [ ] `poster.webp`
   - [ ] `illustration-spread.webp` (Responsive SVG illustrations & narrative typography)

6. **Brewnest (`public/projects/brewnest/`)**
   - [ ] `preview.mp4` (Cinematic hero & live café status)
   - [ ] `poster.webp`
   - [ ] `reservation-sheet.webp` (Reservation flow to Google Apps Script / Google Sheets)

### Archive Projects (`public/projects/<slug>/`)
7. **SceneVault (`public/projects/scenevault/`)**
   - [ ] `poster.webp` (Private screening room movie discovery interface)
   - [ ] `cloudflare-proxy.webp` (Workers API proxy & TMDB state separation)

8. **UrbanNest (`public/projects/urbannest/`)**
   - [ ] `poster.webp` (Luxury interior concept hero)
   - [ ] `estimator-configurator.webp` (Multi-step interactive price estimator)
   - [ ] `before-after-01.webp` & `before-after-02.webp` (Real comparison pair for the before/after slider)

9. **FinTrack (`public/projects/fintrack/`)**
   - [ ] `poster.webp` (Synthetic data personal finance dashboard)
   - [ ] `derived-state-architecture.webp` (Modular ES6 architecture diagram)

10. **3D Sticky Wall (`public/projects/3d-sticky-wall/`)**
    - [ ] `poster.webp` (Interactive flip card preview)
    - [ ] `css-transforms.webp` (CSS 3D flip card interaction)
