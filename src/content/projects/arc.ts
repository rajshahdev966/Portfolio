import { Project } from "../schema";

export const arcProject: Project = {
  slug: "arc",
  title: "ARC",
  subtitle: "Visual OS for DSA Tracking & Problem Progression",
  category: "Product",
  year: "2026",
  status: "Live Product",
  statusType: "live",
  isFlagship: true,
  order: 1,
  accentColor: "#CCFF00", // Acid Lime from Neo-Brutalist palette
  summary:
    "A visual, student-oriented workspace that records a learner's progression from brute-force attempt to optimized solution side-by-side using Monaco Editor instances.",
  tags: [
    "Next.js",
    "React",
    "Tailwind CSS v4",
    "Monaco Editor",
    "Design System",
    "Student Tool",
  ],
  links: {
    live: "https://lnkd.in/dqE7cPmS",
    linkedIn: "https://www.linkedin.com/in/rajshah-dev/",
    github: "www.google.com",
  },
  metrics: [
    {
      label: "Approaches Compared",
      value: "3 Side-by-Side",
      verified: true,
    },
    {
      label: "Campus Adoption",
      value: "Nirma CSE Students",
      verified: true,
    },
  ],
  media: {
    poster: "https://media.licdn.com/dms/image/v2/D4D22AQEX2ZtGB8CbGA/feedshare-shrink_800/B4DaDJWD.0HsAc-/0/1790084399420?e=1793836800&v=beta&t=0kJiWk6jUJiJb_z3Mt4MTRZxxCEfdIU_6o7hVn26jNg",
    previewVideo: "https://www.youtube.com/embed/p1potl1sbjA?si=r9XMZh01GmU14nte",
    isMediaPending: true,
    screenshots: [
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/744562c6-d382-4d02-a348-c973a0e2f103.png",
        caption: "Approach Studio: Comparing brute force vs optimal solution in isolated Monaco instances",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/56cfa145-86b8-4551-a87c-219fadb89c5f.png",
        caption: "Tactile Neo-Brutalist desk aesthetic with ink black and acid lime accents",
      },
    ],
  },
  caseStudy: {
    context:
      "ARC was built out of firsthand frustration while practicing Data Structures and Algorithms as a first-year CSE student at Nirma University.",
    problem:
      "Conventional DSA trackers only record whether a problem was accepted, discarding the messy thinking, brute-force attempts, edge-case failures, and progressive optimizations that actually produce mastery.",
    constraints: [
      "Zero latency when switching between multiple heavy code editor instances.",
      "Tactile, distraction-free visual aesthetic that feels like a physical engineer's desk.",
      "Reliable state persistence without requiring complex backend infrastructure overhead.",
    ],
    decision:
      "Built Approach Studio: an interface featuring Approach 01/02/03 side-by-side with dedicated Monaco Editor instances, adopting a tactile Neo-Brutalist design language (#111116 ink black, #CCFF00 acid lime, #FF2A85 hot pink) rather than conventional sterile SaaS cards.",
    implementation: [
      "Orchestrated independent Monaco Editor instances with debounced state synchronization.",
      "Designed a custom tokenized Neo-Brutalist visual system in Tailwind CSS v4 using Syne, Space Grotesk, and JetBrains Mono.",
      "Implemented structured approach logging capturing time complexity, space complexity, and specific thought revisions per approach.",
    ],
    tradeOffs: [
      "Accepted higher initial editor bundle size in exchange for full IDE-grade syntax highlighting and keyboard shortcuts.",
      "Prioritized desktop multi-column workspace ergonomics over constrained mobile editing.",
    ],
    result:
      "Shipped publicly to student peers at Nirma University, providing an expressive workspace that preserves the learning journey behind algorithmic problem solving.",
    learning:
      "I did not want to track only whether I solved a problem. I wanted to preserve how I learned to solve it. Great developer tools preserve thought processes, not just binary outcomes.",
    architectureNotes: [
      "Approach Studio 3-way code diff model",
      "Tailwind v4 tokenized palette: #111116, #CCFF00, #FF2A85",
      "Monaco editor instance isolation & memory lifecycle management",
    ],
  },
};
