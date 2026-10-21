import { Project } from "../schema";

export const devintelProject: Project = {
  slug: "devintel",
  title: "DEVIntel",
  subtitle: "Cross-Repository Developer Intelligence & Signal Aggregator",
  category: "Developer Tools",
  year: "2026",
  status: "Live Product",
  statusType: "product",
  isFlagship: true,
  order: 2,
  accentColor: "#C6FF3D",
  summary:
    "A client-side developer intelligence engine consuming GitHub REST APIs to aggregate activity signals across disparate repositories with custom 202-polling and quantile heatmap generation.",
  tags: [
    "React",
    "Redux Toolkit",
    "Feature-Sliced Design",
    "GitHub REST API",
    "Tailwind CSS v4",
    "Algorithms",
  ],
  links: {
    live: "https://dev-intel-eight.vercel.app/",
    github: "https://github.com/rajshahdev966/DevIntel",
  },
  metrics: [
    {
      label: "Contribution Matrix",
      value: "52-Week Quantiles",
      verified: true,
    },
    {
      label: "Architecture",
      value: "Feature-Sliced Design",
      verified: true,
    },
  ],
  media: {
    poster: "/projects/devintel/poster.webp",
    previewVideo: "",
    isMediaPending: false,
    screenshots: [
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/DevIntel%20GitHub%20Intelligence%20Dashboard.png",
        caption: "Poster for DevIntel",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/Screenshot%202026-10-20%20221114.png",
        caption: "Screenshot of the dashboard",
      },
    ],
  },
  caseStudy: {
    context:
      "Created as an exercise in frontend architecture discipline: aggregating signals across multiple open-source repositories using GitHub's public API without a custom intermediary server.",
    problem:
      "GitHub API statistics endpoints frequently return HTTP 202 Accepted while compiling data in the background, causing standard fetching pipelines to fail or enter infinite rapid request loops.",
    constraints: [
      "No custom Node.js, Express, or MongoDB backend; strictly client-side React.",
      "Strict GitHub REST API rate limits on unauthenticated and tokenized requests.",
      "Varying commit activity ranges across developers requiring intelligent visual normalization.",
    ],
    decision:
      "Structured the application using Feature-Sliced Design (`/api`, `/hooks`, `/ui`, `/state`) with Redux Toolkit for persistent state, paired with an exponential backoff polling mechanism and mathematical quantile bucketing.",
    implementation: [
      "Engineered an asynchronous polling state machine that detects HTTP 202 Accepted and safely retries with progressive backoff.",
      "Developed a quantile-bucketing algorithm that groups continuous commit byte distributions into 5 discrete visual activity levels.",
      "Decoupled data transformation from view rendering using memoized selectors, preventing unnecessary re-render cascades.",
    ],
    tradeOffs: [
      "Accepted frontend rate-limit constraints rather than introducing a caching proxy server to maintain a zero-cost, zero-maintenance operational model.",
      "Chose Feature-Sliced Design despite extra boilerplate to guarantee clean domain isolation.",
    ],
    result:
      "A high-performance client-side intelligence dashboard that transforms raw GitHub telemetry into actionable cross-repository contribution insights.",
    learning:
      "Asynchronous APIs are not just about fetching data; they require robust handling of intermediate states, rate budgets, and statistical normalization to make raw numbers meaningful.",
    architectureNotes: [
      "HTTP 202 retry/polling state machine",
      "Statistical quantile distribution calculation",
      "Feature-Sliced Design folder boundaries",
    ],
  },
};
