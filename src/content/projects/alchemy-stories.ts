import { Project } from "../schema";

export const alchemyStoriesProject: Project = {
  slug: "alchemy-stories",
  title: "Alchemy Stories",
  subtitle: "Immersive Art, Cyanotype Storytelling & Browser-Native WebAR",
  category: "Creative Frontend",
  year: "2026",
  status: "Concept / Showcase",
  statusType: "concept",
  isFlagship: true,
  order: 3,
  accentColor: "#E0C097", // Warm parchment gold
  summary:
    "An editorial e-commerce experience for a handcrafted botanical art brand pairing scroll-driven paper-folding interactions with browser-native WebAR 3D spatial previews.",
  tags: [
    "Vanilla JavaScript",
    "HTML5 / CSS3",
    "Firebase Firestore",
    "WebAR / model-viewer",
    "Serverless",
    "Editorial UX",
  ],
  links: {
    github: "https://github.com/rajshahdev966/Alchemy-Stories-Full-Stack-Website",
    caseStudy: "https://github.com/rajshahdev966/Alchemy-Stories-Full-Stack-Website/blob/main/Website_Features_Showcase.md",
    live: "https://alchermy-stories-deployed-version.vercel.app/",
  },
  metrics: [
    {
      label: "Hosting Cost Baseline",
      value: "$0 / Month Serverless",
      verified: true,
    },
    {
      label: "3D Spatial Visualization",
      value: "Browser WebAR + QR",
      verified: true,
    },
  ],
  media: {
    poster: "/projects/alchemy-stories/poster.webp",
    previewVideo: "",
    isMediaPending: true,
    screenshots: [
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-47.jpg",
        caption: "Crafted for Beauty, Engineered for result ",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-47%20(2).jpg",
        caption: "Key Highlights",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-47%20(3).jpg",
        caption: "Key Highlights",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-47%20(4).jpg",
        caption: "Key Highlights",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-47%20(5).jpg",
        caption: "Key Highlights",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-48.jpg",
        caption: "Key Highlights",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-48%20(2).jpg",
        caption: "Key Highlights",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-48%20(3).jpg",
        caption: "Key Highlights",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-48%20(4).jpg",
        caption: "Key Highlights",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-48%20(5).jpg",
        caption: "Key Highlights",
      },
      {
        src: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/photo_2026-07-05_08-41-48%20(6).jpg",
        caption: "Key Highlights",
      },
     
    ],
  },
  caseStudy: {
    context:
      "A portfolio showcase project designed around an artisanal interior brand specializing in cyanotype prints, botanical installations, and handcrafted home décor. Creative assets remain property of Alchemy Stories.",
    problem:
      "Generic grid-based e-commerce storefronts fail to convey the tactile texture and physical presence of handcrafted art, while customers struggle to judge scale and room compatibility.",
    constraints: [
      "Zero continuous monthly hosting overhead ($0/mo baseline).",
      "Seamless AR experience on iOS (Quick Look) and Android (Scene Viewer) without native app installs.",
      "Lightweight content management allowing operators to update collections and journals without code changes.",
    ],
    decision:
      "Developed a serverless architecture combining vanilla JavaScript and Firebase with Google's `<model-viewer>` for browser-native WebAR and paper-folding tactile scroll animations.",
    implementation: [
      "Engineered a dual WebAR pipeline supporting USDZ and GLB formats with dynamic QR code handoff from desktop to mobile camera.",
      "Built custom Firebase Firestore and Firebase Auth integration featuring phone-OTP verification and client-side validation.",
      "Created editorial layout templates with rich typography, custom commission inquiry flows, and cart state synchronization.",
    ],
    tradeOffs: [
      "Chose vanilla JavaScript and custom properties over a heavy frontend framework to keep asset payloads light for 3D model loading.",
      "Relied on serverless Firebase free-tier quotas rather than managing dedicated database compute.",
    ],
    result:
      "A distinctive digital flagship that pairs atmospheric, story-led brand presentation with practical 3D spatial commerce and zero maintenance overhead.",
    learning:
      "Artisanal products need an editorial point of view, not just shopping cart functionality. When technology (WebAR) solves a tangible consumer hesitation (scale and fit), it enhances rather than distracts.",
    architectureNotes: [
      "Google model-viewer AR pipeline with QR handoff",
      "Firebase Firestore rules and Phone-OTP Auth",
      "Pure CSS paper-folding scroll animations",
    ],
  },
};
