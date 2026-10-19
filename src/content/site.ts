import { TimelineItem, TestimonialOrPost } from "./schema";

export const siteConfig = {
  name: "Raj Shah",
  handle: "rajshahdev966",
  domain: "rajshah.pro",
  url: "https://rajshah.pro",
  canonicalEmail: "rajshahdev966@gmail.com",
  location: "Ahmedabad, Gujarat, India",
  university: "Nirma University",
  degree: "B.Tech Computer Science and Engineering",
  role: "Design-Led Product Engineer & Frontend Developer",
  status: "First-year B.Tech CSE · Nirma University · Ahmedabad",
  availability: "Open to internships and freelance",
  availabilityStatus: "available" as const,

  positioningStatement:
    "Design-led product engineering: distinctive web experiences and useful software built around real user problems.",

  shortBio:
    "I'm Raj Shah, a first-year B.Tech CSE student at Nirma University and an entrepreneur-turned builder. I turn messy problems into expressive web experiences, useful developer tools, and lean digital products—balancing design, engineering, and real user needs.",

  socials: {
    github: "https://github.com/rajshahdev966",
    linkedin: "https://www.linkedin.com/in/rajshah-dev/",
    x: "https://x.com/rajshahdev966",
    instagram: "https://www.instagram.com/rajshahdev966",
  },

  heroScrambleLines: [
    "=> Design-led frontend engineering",
    "=> Product thinking from real problems",
    "=> API-powered apps and lean serverless",
  ],

  verifiedStats: [
    {
      id: "projects",
      value: "10+",
      label: "Documented Builds",
      verified: true,
      description: "Original products, developer tools, and interactive systems",
    },
    {
      id: "certificates",
      value: "4",
      label: "Course Credentials",
      verified: true,
      description: "Google, Udemy, Meta & Vanderbilt verified course completions",
    },
    {
      id: "years",
      value: "2022",
      label: "Building Since",
      verified: true,
      description: "Early entrepreneurial ventures to modern CSE engineering",
    },
  ],

  capabilities: [
    {
      title: "Interactive Web Experiences",
      outcome: "Memorable digital products with distinct visual identity and smooth interaction design",
      technologies: ["React", "Next.js", "Tailwind CSS v4", "GSAP / ScrollTrigger", "Motion"],
    },
    {
      title: "API-Driven Applications",
      outcome: "Resilient state handling, asynchronous polling, rate-limiting safeguards, and data normalization",
      technologies: ["REST APIs", "Redux Toolkit", "Feature-Sliced Design", "Edge Proxies", "Zod"],
    },
    {
      title: "Lean Serverless Systems",
      outcome: "Operational workflows that run at $0/month without dedicated server maintenance overhead",
      technologies: ["Firebase / Firestore", "Google Apps Script", "Vercel / Cloudflare", "WebAR"],
    },
    {
      title: "Browser & UI Mechanics",
      outcome: "First-principles DOM memory recycling, CSS 3D transforms, and performance profiling",
      technologies: ["Plain JavaScript (ES6+)", "DOM Pooling", "CSS 3D", "Canvas & WebGL"],
    },
  ],

  timeline: [
    {
      period: "2024 — Present",
      title: "B.Tech Computer Science & Engineering",
      organization: "Nirma University · Ahmedabad",
      description:
        "Building computer science foundations in data structures, algorithms (Java), discrete math, and computer architecture while actively engineering software products.",
      category: "education",
      verified: true,
    },
    {
      period: "2022 — 2026",
      title: "Founder",
      organization: "Neurolearn Media",
      description:
        "Began exploring digital products, content workflows, and micro-SaaS experiments before university. Paused to focus on rigorous engineering studies at Nirma University.",
      category: "venture",
      verified: true,
    },
    {
      period: "June 2026",
      title: "5-Day AI Agents: Intensive Vibe Coding Course",
      organization: "Google",
      description: "Course certificate covering agent development workflows and prompt orchestration.",
      category: "certification",
      verified: true,
    },
    {
      period: "Nov 2023",
      title: "Prompt Engineering for ChatGPT",
      organization: "Vanderbilt University",
      description: "Structured prompt patterns, constraints, and generative evaluation techniques.",
      category: "certification",
      verified: true,
    },
    {
      period: "Nov 2023",
      title: "Introduction to Social Media Marketing",
      organization: "Meta",
      description: "Audience targeting, brand storytelling, and campaign distribution analytics.",
      category: "certification",
      verified: true,
    },
    {
      period: "Nov 2023",
      title: "Google Workspace (GSuite): Zero to Pro Complete Guide",
      organization: "Udemy",
      description: "Credential ID: UC-d64292b5-3220-4f56-8b7f-de39dfd81b68.",
      category: "certification",
      verified: true,
    },
  ] as TimelineItem[],

  faqs: [
    {
      question: "Who is Raj Shah?",
      answer:
        "Raj Shah is a first-year B.Tech Computer Science student at Nirma University (Ahmedabad) and an entrepreneur-turned product builder. He specializes in design-led frontend engineering, building expressive interactive websites, developer tools, and lean serverless applications.",
    },
    {
      question: "What is Raj Shah's current academic status?",
      answer:
        "Raj is actively enrolled as a first-year Computer Science and Engineering undergraduate at Nirma University in Ahmedabad, Gujarat, India.",
    },
    {
      question: "Is Raj available for internships or freelance projects?",
      answer:
        "Yes. Raj is actively seeking software engineering internships and selective freelance contracts where he can build high-impact web products, interactive user interfaces, or developer tools.",
    },
    {
      question: "What technologies does Raj use?",
      answer:
        "His core stack includes Next.js, React, TypeScript, Tailwind CSS v4, vanilla JavaScript (ES6+), GSAP / ScrollTrigger, Three.js, Redux Toolkit, REST APIs, and Firebase / Google Apps Script for lean serverless architectures.",
    },
    {
      question: "What makes Raj's approach to engineering unique?",
      answer:
        "Raj pairs entrepreneurial problem framing with visual design taste and technical discipline: every project begins with a real human or developer problem (such as preserving the thought process in algorithmic problem-solving with ARC) and is executed with high attention to interaction design and architecture.",
    },
    {
      question: "How can hiring managers or clients reach Raj?",
      answer:
        "Directly via email at rajshahdev966@gmail.com, or through his verified LinkedIn profile at https://www.linkedin.com/in/rajshah-dev/.",
    },
  ],

  // LinkedIn build-in-public cards (since real client testimonials are pending)
  buildInPublicCards: [
    {
      id: "post-arc-studio",
      author: "Raj Shah",
      role: "Student Builder · Nirma CSE",
      companyOrContext: "Building ARC (Visual DSA OS)",
      content:
        "Standard DSA trackers throw away 90% of the value: the brute force attempts, edge-case mistakes, and progressive rewrites that teach algorithmic intuition. With ARC's Approach Studio, we put Approach 01/02/03 side-by-side in Monaco so you can see your learning curve evolve.",
      date: "2026",
      url: "https://www.linkedin.com/in/rajshah-dev/",
      type: "linkedin_post",
      takeaway: "Developer tools must preserve how developers think, not merely whether their code passed a test suite.",
    },
    {
      id: "post-devintel-fsd",
      author: "Raj Shah",
      role: "Frontend Engineer",
      companyOrContext: "Architecting DEVIntel",
      content:
        "When GitHub's API returns HTTP 202 Accepted, ordinary fetch cascades fail. Handling exponential backoff, isolating state via Feature-Sliced Design, and computing quantile distributions for 52-week activity matrices taught me more about real frontend reliability than any toy tutorial.",
      date: "2026",
      url: "https://www.linkedin.com/in/rajshah-dev/",
      type: "linkedin_post",
      takeaway: "True frontend engineering requires treating the client as an intelligent, asynchronous data system.",
    },
    {
      id: "post-tunnel-flap-dom",
      author: "Raj Shah",
      role: "Browser Mechanics",
      companyOrContext: "Tunnel Flap Experiment",
      content:
        "Can you build a 60fps infinite browser game using only standard HTML DOM nodes without Canvas or React? By establishing a static 8-node circular pool and recycling elements across the viewport, garbage collection pauses drop to zero.",
      date: "2026",
      url: "https://www.linkedin.com/in/rajshah-dev/",
      type: "linkedin_post",
      takeaway: "Deep mastery of browser DOM lifecycles and garbage collection unlocks unexpected performance gains.",
    },
  ] as TestimonialOrPost[],
};
