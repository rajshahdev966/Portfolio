# Raj Shah — Portfolio

> **Design-led product engineering: distinctive web experiences and useful software built around real user problems.**  
> Built with Next.js (App Router, React 19), Tailwind CSS v4 (Obsidian Lime), GSAP, React Three Fiber, Motion, and Lenis.

---

## 1. Positioning & Factual Integrity

- **Profile**: Raj Shah is a first-year B.Tech Computer Science and Engineering student at Nirma University (Ahmedabad, India) and an entrepreneur-turned product builder.
- **Goals**: (1) Attract high-velocity software engineering internships, (2) Win selective freelance contracts.
- **Integrity Rule**: No invented metrics, user counts, client contracts, revenue, uptime, or fake certificates. All data is verified from [`docs/verified-facts.md`](file:///c:/Users/Raj%20Shah/OneDrive/Desktop/Portfolio/docs/verified-facts.md) and [`docs/bio.md`](file:///c:/Users/Raj%20Shah/OneDrive/Desktop/Portfolio/docs/bio.md).
- **Missing Media**: Tracked in [`MISSING_ASSETS.md`](file:///c:/Users/Raj%20Shah/OneDrive/Desktop/Portfolio/MISSING_ASSETS.md). When media is pending, a clean typographic card is displayed. Never generate synthetic product screenshots.

---

## 2. Tech Stack & Architecture

- **Framework**: Next.js 15+ (App Router, Server Components by default).
- **Styling**: Tailwind CSS v4 using CSS variable tokens defined in [`src/styles/tokens.css`](file:///c:/Users/Raj%20Shah/OneDrive/Desktop/Portfolio/src/styles/tokens.css) (Dark-only Obsidian Lime palette).
- **Scroll & Ticker**: Lenis smooth scroll driven synchronously by `gsap.ticker` with `lagSmoothing(0)`.
- **Motion & Physics**:
  - GSAP (ScrollTrigger, DrawSVG) for pinned scroll scrub, progress lines, and signature vector drawing.
  - Motion (`motion/react`) for layout animations, magnetic springs, and modals.
  - Matter.js for the interactive Toolbox chip pile.
  - React Three Fiber + Three.js for the Hero 2.5D depth-displacement shader plane.
- **Search & Discovery**: `cmdk` command palette accessible via `Cmd+K` or `/`.
- **Calm Mode**: Built-in toggle (and auto-detection for `prefers-reduced-motion` and low-spec devices) that pauses WebGL, physics, scramble, and parallax for a calm reading experience.
- **Technical SEO & AIEO**:
  - JSON-LD Schemas: `Person`, `WebSite`, `ProfilePage`, `SoftwareApplication`, `FAQPage`, `BreadcrumbList`.
  - Permissive AI Crawler configuration in [`src/app/robots.ts`](file:///c:/Users/Raj%20Shah/OneDrive/Desktop/Portfolio/src/app/robots.ts).
  - Machine-readable indices at `/llms.txt` and `/llms-full.txt`.

---

## 3. Project Structure

```
src/
├── app/
│   ├── layout.tsx             # Root layout, fonts, JSON-LD, Lenis/GSAP providers
│   ├── page.tsx               # Home: Loader, Hero, Stats, Work, Process, Toolbox, Lab, Testimonials, Contact
│   ├── work/[slug]/           # Dynamic 8-part case study route with static generation
│   ├── lab/                   # Interactive Lab sandbox (3 live working experiments)
│   ├── about/                 # Answer-first bio, verified timeline, capabilities & FAQs
│   ├── not-found.tsx          # Accessible 404 page
│   ├── robots.ts              # Robots.txt with AI search crawler support
│   ├── sitemap.ts             # Dynamic canonical XML sitemap
│   ├── llms.txt/route.ts      # Concise AI search index
│   └── llms-full.txt/route.ts # Full factual markdown dossier
├── components/
│   ├── ui/                    # Button, Badge, Cursor, MediaPendingCard, BeforeAfterSlider, CommandPalette, LiveClock, CalmModeToggle
│   ├── sections/              # Loader, Hero, StatsTicker, SelectedWork, ProjectArchive, Process, Toolbox, LabTeaser, Testimonials, Contact
│   ├── webgl/                 # HeroDepthCanvas (R3F 2.5D shader plane)
│   └── navigation/            # Header, MobileMenu, Footer
├── content/
│   ├── schema.ts              # Zod validation schemas
│   ├── site.ts                # Global verified facts, social links, FAQs, timeline
│   └── projects/              # Dedicated data file per project (ARC, DEVIntel, Alchemy Stories, etc.)
├── hooks/                     # useMagnetic, useScramble, usePrefersCalm
├── lib/                       # gsap, lenis, jsonld, utils
└── styles/                    # tokens.css (Tailwind v4 @theme & Obsidian Lime variables)
```

---

## 4. How to Manage Project Data

As requested, each project lives in its own dedicated file under `src/content/projects/`:
- `arc.ts`
- `devintel.ts`
- `alchemy-stories.ts`
- `tunnel-flap.ts`
- `ghar.ts`
- `brewnest.ts`
- `scenevault.ts`
- `urbannest.ts`
- `fintrack.ts`
- `sticky-wall.ts`

### Adding a New Project:
1. Create `src/content/projects/<slug>.ts` exporting a `Project` object adhering to `ProjectSchema`.
2. Register and import it in `src/content/projects/index.ts`.
3. The project will automatically populate the home page, project archive table, static paths `/work/<slug>`, dynamic OpenGraph cards, sitemap, and AI indices!

---

## 5. Scripts

- **Development**: `pnpm dev` (starts dev server on http://localhost:3000)
- **Production Build**: `pnpm build` (compiles and statically exports all routes)
- **Link Verification**: `pnpm verify-links` (audits all external URLs for active HTTP status)
- **Type Check**: `pnpm tsc --noEmit`
