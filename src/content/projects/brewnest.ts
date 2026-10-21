import { Project } from "../schema";

export const brewnestProject: Project = {
  slug: "brewnest",
  title: "Brewnest",
  subtitle: "Artisanal Café & Workspace Portal with Lean Serverless Operations",
  category: "Serverless",
  year: "2026",
  status: "Concept / Prototype",
  statusType: "concept",
  isFlagship: true,
  order: 6,
  accentColor: "#D4A373", // Warm roast amber
  summary:
    "A mobile-first web portal for an artisanal café and co-working sanctuary, featuring real-time seating availability indicators and a $0-cost Google Apps Script reservation pipeline.",
  tags: [
    "HTML5 / CSS3",
    "Vanilla JavaScript",
    "Google Apps Script",
    "Google Sheets API",
    "Lean Serverless",
    "Mobile-First",
  ],
  links: {
    github: "https://github.com/rajshahdev966/Brewnest-portfolio2",
    live: "https://rajshahdev966.github.io/Brewnest-portfolio2/",
  },
  metrics: [
    {
      label: "Backend Server Cost",
      value: "$0 / Month",
      verified: true,
    },
    {
      label: "Operational Backend",
      value: "Google Apps Script + Sheets",
      verified: true,
    },
  ],
  media: {
    poster: "/projects/brewnest/poster.webp",
    previewVideo: "",
    isMediaPending: true,
    screenshots: [
      {
        src: "/projects/brewnest/reservation-sheet.webp",
        caption: "Asynchronous reservation submission dispatched directly into a sanitized Google Sheets operational log",
      },
    ],
  },
  caseStudy: {
    context:
      "A concept web application designed for boutique café owners who need modern digital reservation workflows and clear operational status without the ongoing overhead of cloud databases or dedicated server infrastructure.",
    problem:
      "Small hospitality businesses often get locked into expensive monthly reservation SaaS platforms or attempt complex custom backend builds that break when staff changes occur.",
    constraints: [
      "$0 continuous operating expense.",
      "Must be intuitive for non-technical staff to manage reservations directly in familiar spreadsheets.",
      "Instant loading and battery-efficient performance on mobile devices over cellular connections.",
    ],
    decision:
      "Built a mobile-first responsive frontend connected to a Google Apps Script web endpoint that validates, sanitizes, and appends reservation payloads directly into the café manager's Google Sheet.",
    implementation: [
      "Engineered an asynchronous client-side fetch pipeline submitting structured reservation records with CSRF and spam honeypot safeguards.",
      "Implemented a dynamic business hours and live seating capacity state indicator based on client time math and scheduled operating windows.",
      "Constructed a cinematic hero presentation using compressed ambient loop video and CSS backdrop filters.",
    ],
    tradeOffs: [
      "Accepted minor execution latency inherent in Google Apps Script cold starts (1–2s) in exchange for zero monthly infrastructure bills.",
      "Relied on client-side state checks rather than real-time WebSocket seat sensors.",
    ],
    result:
      "A highly polished, mobile-friendly café presence that provides real business utility and operational clarity for zero monthly hosting expenditure.",
    learning:
      "Good engineering is about finding the leanest architecture that solves the actual human problem. A well-designed Google Sheets backend is often vastly superior to an over-engineered microservice stack for a local business.",
    architectureNotes: [
      "Google Apps Script Web App POST endpoint",
      "Sanitized data append to Google Sheets",
      "Dynamic capacity and operating hours calculation",
    ],
  },
};
