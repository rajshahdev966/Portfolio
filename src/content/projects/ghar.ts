import { Project } from "../schema";

export const gharProject: Project = {
  slug: "ghar",
  title: "GHAR",
  subtitle: "Food That Raised Us — Narrative Web Experience",
  category: "Creative Frontend",
  year: "2026",
  status: "Live Showcase",
  statusType: "live",
  isFlagship: true,
  order: 5,
  accentColor: "#FF6B4A", // Warm terracotta spice
  summary:
    "An emotive, narrative-driven digital journey celebrating comfort food, family kitchens, and cultural memory through expressive typography, responsive SVG art, and framework-free motion.",
  tags: [
    "HTML5 / CSS3",
    "Vanilla JavaScript",
    "SVG Art Direction",
    "Narrative UX",
    "Typography",
    "Vercel",
  ],
  links: {
    github: "https://github.com/rajshahdev966/Ghar---Food-that-raised-us",
    live: "https://ghar-food-that-raised-us.vercel.app/",
  },
  metrics: [
    {
      label: "Art Direction",
      value: "Narrative Editorial",
      verified: true,
    },
    {
      label: "Runtime Frameworks",
      value: "0 (Pure Semantic Web)",
      verified: true,
    },
  ],
  media: {
    poster: "/projects/ghar/poster.webp",
    previewVideo: "/projects/ghar/preview.mp4",
    isMediaPending: true,
    screenshots: [
      {
        src: "/projects/ghar/illustration-spread.webp",
        caption: "Responsive editorial spread combining evocative typography and custom SVG culinary vignettes",
      },
    ],
  },
  caseStudy: {
    context:
      "A creative digital experience exploring culinary nostalgia: 'Different kitchens. Different recipes. Same love.' Not a conventional restaurant site or recipe database, but an art-directed cultural archive.",
    problem:
      "Most food-related websites are utilitarian databases burdened by intrusive ads, search-optimized filler, and rigid component cards that erase emotional resonance.",
    constraints: [
      "Zero JavaScript framework overhead to maximize raw typography and layout rendering performance.",
      "Scalable SVG illustrations that preserve handcrafted character across all screen breakpoints.",
      "Subtle, natural scroll transitions that evoke turning pages of a cherished family cookbook.",
    ],
    decision:
      "Engineered the experience with semantic HTML5, modern CSS Grid/Flexbox, and lightweight vanilla JavaScript, putting art direction, pacing, and emotional rhythm front and center.",
    implementation: [
      "Composed multi-layered editorial layouts that break rigid grid boundaries with floating spices, recipe notes, and personal memories.",
      "Implemented responsive SVG illustrations optimized for mobile screen densities and high-contrast dark and warm lighting.",
      "Designed deliberate scroll-triggered reveal sequences using CSS intersection observers and GPU-accelerated transforms.",
    ],
    tradeOffs: [
      "Avoided dynamic client-side templating in favor of static structural markup to ensure instant first paint.",
      "Curated a small, deliberate collection of story vignettes rather than attempting an exhaustive recipe index.",
    ],
    result:
      "A soulful web project deployed on Vercel that showcases taste, visual restraint, editorial pacing, and knowing when a framework is unnecessary.",
    learning:
      "Engineering excellence is not just measured by complex state machines—it is also demonstrated by knowing when to strip away dependencies to let storytelling and craftsmanship shine.",
    architectureNotes: [
      "Pure semantic HTML5 layout architecture",
      "CSS custom property theme tokens for warm earthen palettes",
      "Lightweight IntersectionObserver scroll reveals",
    ],
  },
};
