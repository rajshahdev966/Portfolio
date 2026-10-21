import { Project } from "../schema";

export const fintrackProject: Project = {
  slug: "fintrack",
  title: "FinTrack",
  subtitle: "Modular ES6 Personal Finance Engine with Derived State",
  category: "Browser Engineering",
  year: "2026",
  status: "Concept / Prototype",
  statusType: "concept",
  isFlagship: false,
  order: 9,
  accentColor: "#10B981", // Emerald ledger
  summary:
    "A multi-page responsive financial dashboard engineered in vanilla JavaScript with ES modules, using derived runtime calculations over localStorage to prevent state synchronization drift.",
  tags: [
    "Vanilla JavaScript",
    "ES Modules",
    "LocalStorage Hub",
    "Derived State",
    "Chart Visualization",
    "No-Framework Architecture",
  ],
  links: {
    live: "https://fintrack-dashboard-project.vercel.app/",
    github: "https://github.com/rajshahdev966/Fintrack-Dashboard-Project",
  },
  metrics: [
    {
      label: "Architecture",
      value: "Decoupled ES Modules",
      verified: true,
    },
    {
      label: "State Strategy",
      value: "Single Source of Truth",
      verified: true,
    },
  ],
  media: {
    poster: "/projects/fintrack/poster.webp",
    isMediaPending: true,
    screenshots: [
      {
        src: "/projects/fintrack/derived-state-architecture.webp",
        caption: "Derived state flow: transactions calculate net worth and categorical expenses on-the-fly without storage desynchronization",
      },
    ],
  },
  caseStudy: {
    context:
      "A software architecture experiment conducted in August 2026: building a stateful, multi-page financial tracking dashboard with vanilla JavaScript to master modularity before relying on React.",
    problem:
      "Many vanilla applications store duplicate totals alongside raw transaction logs, which inevitably leads to desynchronized state and phantom calculations when records are edited or deleted.",
    constraints: [
      "Pure browser ES modules—no bundlers, no external frameworks.",
      "Prevent circular dependencies between navigation, state manager, and UI renderers.",
      "Strict data privacy: synthetic demo fixtures only, with zero third-party telemetry.",
    ],
    decision:
      "Established localStorage as a single append-only transaction hub, computing balances, category breakdowns, and net worth curves dynamically at runtime while resolving circular module dependencies through callback inversion.",
    implementation: [
      "Structured codebase into strict domain layers: `/core` (storage & calculation), `/components` (renderers), and `/pages`.",
      "Separated event listener registration from state dispatch to eliminate duplicate event firing on view transitions.",
      "Implemented a light/dark theme toggle with system preference listeners and CSS variable updates.",
    ],
    tradeOffs: [
      "Accepted recalculating aggregated metrics from raw records on page entry in exchange for absolute data integrity.",
    ],
    result:
      "A modular, maintainable client-side finance application demonstrating robust JavaScript engineering, clean separation of concerns, and defensive state management.",
    learning:
      "Deriving values on demand from a single source of truth is always cleaner than synchronizing separate caches. Frameworks come and go, but state discipline remains foundational.",
    architectureNotes: [
      "Single-source transaction log in localStorage",
      "Dynamic on-the-fly metric derivation",
      "Inverted callback dependency patterns",
    ],
  },
};
