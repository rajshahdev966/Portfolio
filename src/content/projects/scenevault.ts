import { Project } from "../schema";

export const scenevaultProject: Project = {
  slug: "scenevault",
  title: "SceneVault",
  subtitle: "Cinematic Film Discovery & Personal Screening Room",
  category: "React",
  year: "2026",
  status: "Live / Educational",
  statusType: "live",
  isFlagship: false,
  order: 7,
  accentColor: "#E50914", // Cinematic crimson
  summary:
    "A private screening room movie discovery experience utilizing TMDB data via a secure Cloudflare Workers API proxy, decoupling search query states from pagination.",
  tags: [
    "React 18",
    "React Router",
    "Cloudflare Workers",
    "TMDB API",
    "Axios",
    "Vercel",
  ],
  links: {
    github: "https://github.com/rajshahdev966/SceneVault---React-Movie-App",
    live: "https://scene-vault-kappa.vercel.app/",
  },
  metrics: [
    {
      label: "API Architecture",
      value: "Cloudflare Edge Proxy",
      verified: true,
    },
    {
      label: "Personal Library",
      value: "My Cinema Watchlist",
      verified: true,
    },
  ],
  media: {
    poster: "/projects/scenevault/poster.webp",
    isMediaPending: true,
    screenshots: [
      {
        src: "/projects/scenevault/cloudflare-proxy.webp",
        caption: "Cloudflare Workers edge API proxy securing secrets and caching frequent movie responses",
      },
    ],
  },
  caseStudy: {
    context:
      "Built as a comprehensive React exploration focusing on state segregation, third-party API proxying, and crafting an immersive cinema aesthetic.",
    problem:
      "Client-side Single Page Applications calling third-party movie APIs directly expose private API keys in browser network panels and struggle with state collisions between active search inputs and paginated browse views.",
    constraints: [
      "Keep TMDB API secret tokens completely hidden from client inspection.",
      "Support responsive modal previews with trailers and cast listings without layout thrashing.",
    ],
    decision:
      "Deployed a lightweight Cloudflare Worker as a serverless edge proxy to inject authorization headers, caching movie payloads while isolating search state using React Context and React Router.",
    implementation: [
      "Built edge caching headers in Cloudflare Workers to reduce duplicate TMDB requests.",
      "Separated search input debouncing from browse category state to eliminate race conditions.",
      "Designed dark-mode UI with rich backdrop posters, cast sliders, and trailer modals.",
    ],
    tradeOffs: [
      "Relied on browser localStorage for personal watchlist persistence rather than maintaining authenticated cloud user accounts.",
    ],
    result:
      "A fast, secure movie discovery web application with zero client key exposure and fluid category navigation.",
    learning:
      "Never call sensitive third-party APIs directly from client code. A lightweight edge proxy like Cloudflare Workers provides both security and edge caching with minimal latency.",
    architectureNotes: [
      "Cloudflare Workers API proxy",
      "Decoupled search query and pagination state",
      "Reusable modal and trailer viewports",
    ],
  },
};
