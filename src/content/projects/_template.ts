import { defineProject } from "./types";

/**
 * ============================================================================
 * PROJECT TEMPLATE
 * ============================================================================
 * How to add a new project in 3 steps:
 *
 * 1. Duplicate this file and rename it (e.g. `src/content/projects/my-project.ts`).
 * 2. Fill in your project information below.
 * 3. Import and add it to `rawProjects` array in `src/content/projects/index.ts`.
 *
 * That's it! The portfolio handles the rest automatically (URL generation,
 * metadata, sitemap, LLM text, and case study page).
 * ============================================================================
 */

export const myProject = defineProject({
  // Required core fields
  slug: "my-project-slug", // URL path: /work/my-project-slug
  title: "Project Name",
  subtitle: "A clear, compelling one-sentence description of what this is",
  category: "Product", // e.g. "Product", "Creative Frontend", "Developer Tools", "AI / ML"
  year: "2026",
  summary:
    "2-3 sentences explaining what problem this project solves, who it is for, and how you engineered it.",
  tags: ["Next.js", "React", "TypeScript", "Tailwind CSS v4"],

  // Flexible links — add whatever you have, omit what you don't!
  links: {
    live: "https://your-live-demo.com",
    github: "https://github.com/rajshah-dev/your-repo",
    data: "https://your-dataset-or-api.com", // <-- Your Data / Dataset / API Link!
    docs: "https://your-documentation.com",
    demo: "https://youtube.com/watch?v=...",
    linkedIn: "https://linkedin.com/posts/...",

    // Optional: any extra custom labeled links
    custom: [
      { label: "Kaggle Dataset", url: "https://kaggle.com/datasets/..." },
      { label: "Figma File", url: "https://figma.com/file/..." },
    ],
  },

  // Display options
  isFlagship: false, // Set to true to feature this project on the Home page Selected Work list
  order: 10, // Sort order (1 = highest priority)
  accentColor: "#C6FF3D", // Brand accent color for cards and glow effects
  status: "Live Product", // e.g. "Live Product", "Open Source", "Under Development"
  statusType: "live", // "live" | "source" | "concept" | "experiment"

  // Optional: Key metrics or results
  metrics: [
    { label: "Active Users", value: "250+", verified: true },
    { label: "Performance", value: "99/100 Lighthouse", verified: true },
  ],

  // Optional: Media assets
  media: {
    poster: "/projects/my-project/poster.webp",
    isMediaPending: true, // Set to false once real screenshots are placed in /public
    screenshots: [
      {
        src: "/projects/my-project/screen-1.webp",
        caption: "Main dashboard layout with real-time analytics",
      },
    ],
  },

  // Optional: Deep-Dive Case Study (Fill in as much or as little as you like)
  caseStudy: {
    context: "Why did you start building this project? What was the background?",
    problem: "What was the specific friction, user pain point, or technical bottleneck?",
    constraints: [
      "Hard technical constraint 1 (e.g. rate limits, zero backend cost)",
      "Design constraint 2 (e.g. sub-100ms response time)",
    ],
    decision: "What architectural or design approach did you choose, and why?",
    implementation: [
      "Step 1: State management and data fetching",
      "Step 2: Component architecture and performance optimization",
    ],
    tradeOffs: [
      "What trade-offs did you make? (e.g. prioritized speed over features)",
    ],
    result: "What was the measurable outcome or real feedback received?",
    learning: "What was your biggest engineering or product lesson?",
    architectureNotes: [
      "Key architectural pattern 1",
      "Key architectural pattern 2",
    ],
  },
});
