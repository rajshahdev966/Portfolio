import { Project } from "../schema";

export const stickyWallProject: Project = {
  slug: "3d-sticky-wall",
  title: "3D Sticky Wall",
  subtitle: "Tactile Algorithmic Recall & CSS 3D Transform Surface",
  category: "Creative Frontend",
  year: "2026",
  status: "UI Experiment",
  statusType: "experiment",
  isFlagship: false,
  order: 10,
  accentColor: "#F59E0B", // Post-it gold
  summary:
    "An interactive spatial recall surface for algorithmic patterns: tactile 3D cards that flip from conceptual intuition to concise code implementations using pure CSS transforms.",
  tags: [
    "HTML5 / CSS3",
    "CSS 3D Transforms",
    "Spatial UI",
    "Micro-Interactions",
    "DSA Recall",
    "Zero-Runtime Animation",
  ],
  links: {
    linkedIn: "https://www.linkedin.com/in/rajshah-dev/",
  },
  metrics: [
    {
      label: "Animation Library Weight",
      value: "0 KB (Pure CSS)",
      verified: true,
    },
    {
      label: "Spatial Mechanics",
      value: "preserve-3d Matrix",
      verified: true,
    },
  ],
  media: {
    poster: "/projects/3d-sticky-wall/poster.webp",
    isMediaPending: true,
    screenshots: [
      {
        src: "/projects/3d-sticky-wall/css-transforms.webp",
        caption: "GPU-accelerated CSS 3D flip card revealing core Java algorithmic intuition on reverse face",
      },
    ],
  },
  caseStudy: {
    context:
      "A creative UI micro-experiment designed to solve DSA technique retention: providing a tactile, spatial memory board rather than forcing learners into sprawling Notion notes or flat spreadsheets.",
    problem:
      "Algorithmic intuition fades quickly without active recall. Digital note tools are either too static to feel engaging or too heavy to open during quick revision drills.",
    constraints: [
      "Zero JavaScript animation library dependencies; all card flips must execute on the GPU via CSS `transform-style: preserve-3d`.",
      "Instant response on mobile touch interactions.",
    ],
    decision:
      "Created a physical sticky-board layout with two-sided 3D cards: the front displays the high-level intuition and constraint clues, while a perspective flip reveals the clean algorithmic template on the reverse.",
    implementation: [
      "Configured 3D perspective context (`perspective: 1200px`) and `backface-visibility: hidden` across card elements.",
      "Added subtle pointer-driven tilt effects responding to cursor hover angles.",
      "Engineered keyboard toggle support (Enter / Space) for accessible spatial exploration.",
    ],
    tradeOffs: [
      "Accepted fixed card aspect ratios to maintain consistent perspective depths across grid rows.",
    ],
    result:
      "A delight-focused algorithmic study tool integrated directly into the Lab, proving that expressive 3D micro-interactions require zero JavaScript overhead when CSS capabilities are fully leveraged.",
    learning:
      "Tactile micro-interactions elevate functional tools from chore to pleasure. When an interface feels physical and responsive, users return to practice more often.",
    architectureNotes: [
      "CSS preserve-3d and backface-visibility matrices",
      "GPU-composited transform: rotateY(180deg)",
      "Accessible keyboard Enter/Space flip listeners",
    ],
  },
};
