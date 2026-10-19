import { Project } from "../schema";

export const urbannestProject: Project = {
  slug: "urbannest",
  title: "UrbanNest",
  subtitle: "Luxury Interior Concept & Multi-Step Interactive Cost Estimator",
  category: "Creative Frontend",
  year: "2026",
  status: "Concept Work",
  statusType: "concept",
  isFlagship: false,
  order: 8,
  accentColor: "#C5A880", // Champagne sandstone
  summary:
    "An editorial interior design showcase featuring an interactive cost estimator, multi-step project configurator, and an accessible before/after space transformation slider.",
  tags: [
    "HTML5 / CSS3",
    "JavaScript ES6+",
    "Tailwind CSS",
    "Interactive Estimator",
    "Conversion UX",
    "Before/After Slider",
  ],
  links: {
    github: "https://github.com/rajshahdev966/UrbanNest-portfolio2",
    live: "https://rajshahdev966.github.io/UrbanNest-portfolio2/",
  },
  metrics: [
    {
      label: "Lead Qualification",
      value: "Multi-Step Estimator",
      verified: true,
    },
    {
      label: "Transformation UX",
      value: "Accessible Slider",
      verified: true,
    },
  ],
  media: {
    poster: "/projects/urbannest/poster.webp",
    isMediaPending: true,
    screenshots: [
      {
        src: "/projects/urbannest/estimator-configurator.webp",
        caption: "Multi-step cost estimator with dynamic pricing formulas based on square footage and finishes",
      },
    ],
  },
  caseStudy: {
    context:
      "A concept showcase for a high-end interior architecture studio aiming to pre-qualify residential and commercial clients before initial consultations.",
    problem:
      "Potential renovation clients often hesitate to reach out due to price uncertainty, while design studios waste hours filtering unqualified inquiries.",
    constraints: [
      "Dynamic cost calculations must update instantaneously without page reloads.",
      "Accessible before-and-after image slider supporting full keyboard navigation.",
      "Editorial aesthetic with luxurious typography and generous negative space.",
    ],
    decision:
      "Created a guided multi-step project estimator that recalculates estimates in real time as users adjust room dimensions, material tiers, and stylistic treatments, capped with an accessible before/after slider.",
    implementation: [
      "Engineered mathematical estimation models factoring in material costs, labor ratios, and finish tiers.",
      "Built a custom accessible before/after comparison slider compliant with WCAG `role='slider'` standards.",
      "Implemented smooth sticky horizontal mobile scrolling for portfolio case study spreads.",
    ],
    tradeOffs: [
      "Presented figures as transparent ballpark budget ranges rather than binding contractual quotes.",
    ],
    result:
      "A compelling lead-generation digital experience that demonstrates how interactive calculators can bridge visitor curiosity and commercial consultation.",
    learning:
      "Interactive estimators transform passive visitors into active participants. Giving users instant feedback about cost and scope builds immense trust.",
    architectureNotes: [
      "Dynamic client-side pricing formula engine",
      "Accessible keyboard-driven before/after slider",
      "Sticky horizontal mobile gallery",
    ],
  },
};
