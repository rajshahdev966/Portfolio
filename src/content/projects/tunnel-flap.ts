import { Project } from "../schema";

export const tunnelFlapProject: Project = {
  slug: "tunnel-flap",
  title: "Tunnel Flap",
  subtitle: "First-Principles DOM-Based 2D Physics Game Engine",
  category: "Browser Engineering",
  year: "2026",
  status: "Concept / Prototype",
  statusType: "concept",
  isFlagship: true,
  order: 4,
  accentColor: "#00F0FF", // Electric cyan
  summary:
    "An infinite-scrolling browser game built from first principles using plain JavaScript and raw DOM recycling—zero Canvas, zero React, and zero external game engines.",
  tags: [
    "Vanilla JavaScript",
    "DOM Recycling",
    "Game Loops",
    "Physics Math",
    "Memory Management",
    "Audio API",
  ],
  links: {
    linkedIn: "https://www.linkedin.com/in/rajshah-dev/",
  },
  metrics: [
    {
      label: "DOM Node Pool",
      value: "8 Recycled Nodes",
      verified: true,
    },
    {
      label: "Framework Dependencies",
      value: "0 (Pure Vanilla)",
      verified: true,
    },
  ],
  media: {
    poster: "/projects/tunnel-flap/poster.webp",
    previewVideo: "",
    isMediaPending: true,
    screenshots: [
      {
        src: "/projects/tunnel-flap/object-pool-diagram.webp",
        caption: "Cyclic 8-node DOM pool: nodes exiting the left edge reposition to the right with randomized gap geometry",
      },
    ],
  },
  caseStudy: {
    context:
      "A technical deep dive exploring browser rendering mechanics, garbage collection thresholds, and low-level object lifecycle management without framework abstractions.",
    problem:
      "Naive DOM games continually create and remove elements in an infinite scroll, triggering repetitive garbage collection pauses that cause perceptible frame drops and stutter.",
    constraints: [
      "Strictly no `<canvas>` or WebGL rendering contexts allowed; rendering must use standard DOM tree elements.",
      "Strictly no external game libraries (Phaser, Pixi) or UI frameworks (React).",
      "Memory profile must remain flat throughout extended continuous play sessions.",
    ],
    decision:
      "Built a fixed object pool of eight DOM obstacle nodes recycled continuously along the horizontal axis, paired with a delta-time physics step and mathematical AABB bounding-box collision detection.",
    implementation: [
      "Engineered an 8-node circular queue where obstacles passing the left boundary are re-positioned to the right with randomized aperture heights.",
      "Calculated precise mathematical bounding boxes rather than relying on DOM element rects to eliminate transparent sprite padding errors.",
      "Implemented a fixed-step physics accumulator for gravity and flap impulses, synchronized with Web Audio API sound cues.",
    ],
    tradeOffs: [
      "Accepted CSS transform rendering limitations compared to Canvas batch draws, restricting maximum concurrent particle count.",
      "Manually managed coordinate systems across varied display resolutions.",
    ],
    result:
      "Demonstrated that careful memory architecture and object pooling can deliver fluid, responsive game physics directly within standard HTML/CSS DOM trees.",
    learning:
      "Frameworks are convenient, but understanding the browser's paint lifecycle, garbage collector, and layout pipeline from first principles is what makes high-performance frontend engineering possible.",
    architectureNotes: [
      "Fixed 8-node circular DOM pool",
      "AABB collision math excluding sprite alpha padding",
      "Single RAF tick with delta-time accumulator",
    ],
  },
};
