export type Status = "shipped" | "in-progress" | "learning";

export type Tool = {
  id: string;
  name: string; // "React 19 / 18"
  subtitle: string; // "UI LIBRARY"
  icon?: string; // path or icon key; fall back to initials badge
  status: Status;
  primary?: boolean; // the center node of its category (max one)
  projects: string[]; // project IDs from the existing projects data
  highlights?: string[]; // optional bullets for the "Used in" panel
};

export type Category = {
  id: string;
  label: string; // "Frontend Systems"
  icon: string;
  breadcrumb?: string; // "MODERN WEB / REACT ECOSYSTEM"
  tools: Tool[];
};

export const toolbox: Category[] = [
  {
    id: "frontend",
    label: "Frontend Systems",
    icon: "code",
    breadcrumb: "MODERN WEB / REACT ECOSYSTEM",
    tools: [
      {
        id: "react",
        name: "React 19",
        subtitle: "UI LIBRARY",
        icon: "react",
        status: "shipped",
        primary: true,
        projects: ["arc", "devintel", "scenevault"],
        highlights: [
          "Interactive multi-instance Monaco approach studio",
          "Component state boundaries & render isolation",
          "Custom hooks for magnetic physics & audio cues",
        ],
      },
      {
        id: "nextjs",
        name: "Next.js",
        subtitle: "APP ROUTER",
        icon: "nextjs",
        status: "shipped",
        projects: ["arc", "alchemy-stories"],
        highlights: [
          "App Router static route segment generation",
          "Edge metadata & dynamic OpenGraph card generation",
          "Zero-CLS image optimization & streaming boundaries",
        ],
      },
      {
        id: "tailwind",
        name: "Tailwind CSS v4",
        subtitle: "UTILITY CSS",
        icon: "tailwind",
        status: "shipped",
        projects: ["arc", "devintel"],
        highlights: [
          "Tokenized design architecture with CSS custom properties",
          "Container queries & fluid clamp typography",
          "Obsidian Lime dark-mode contrast palette",
        ],
      },
      {
        id: "javascript",
        name: "JavaScript (ES6+)",
        subtitle: "LANGUAGE",
        icon: "javascript",
        status: "shipped",
        projects: ["tunnel-flap", "fintrack", "brewnest"],
        highlights: [
          "Cyclic 8-node DOM object pooling without GC spikes",
          "Modern async/await & Promise orchestration",
          "Custom matrix transformations on canvas elements",
        ],
      },
      {
        id: "htmlcss",
        name: "Semantic HTML5 / CSS3",
        subtitle: "MARKUP & STYLING",
        icon: "html",
        status: "shipped",
        projects: ["ghar", "urbannest", "brewnest"],
        highlights: [
          "WCAG 2.2 Level AA keyboard accessibility & ARIA landmarks",
          "CSS 3D preserve-3d matrix rotations",
          "Responsive multi-device viewport design",
        ],
      },
      {
        id: "redux",
        name: "Redux Toolkit",
        subtitle: "STATE MANAGEMENT",
        icon: "redux",
        status: "shipped",
        projects: ["devintel"],
        highlights: [
          "Feature-Sliced Design state slicing",
          "Normalized entity state & immutable cache layers",
          "Typed dispatch & action creator architecture",
        ],
      },
    ],
  },
  {
    id: "backend-apis",
    label: "Backend & APIs",
    icon: "server",
    breadcrumb: "SERVICES / RUNTIME & PROTOCOLS",
    tools: [
      {
        id: "node",
        name: "Node.js & Express",
        subtitle: "JAVASCRIPT RUNTIME",
        icon: "nodejs",
        status: "shipped",
        primary: true,
        projects: [],
        highlights: [
          "RESTful endpoint routing & middleware architecture",
          "Local developer automation & build tooling scripts",
          "Structured JSON request validation & error pipelines",
        ],
      },
      {
        id: "rest",
        name: "REST APIs & Polling",
        subtitle: "INTEGRATION PATTERN",
        icon: "api",
        status: "shipped",
        projects: ["devintel", "scenevault"],
        highlights: [
          "Client-side exponential backoff polling",
          "Resilient token management & rate-limit throttling",
          "Schema validation on untrusted remote payloads",
        ],
      },
      {
        id: "apps-script",
        name: "Google Apps Script",
        subtitle: "SERVERLESS AUTOMATION",
        icon: "google",
        status: "shipped",
        projects: ["brewnest"],
        highlights: [
          "$0-overhead reservation dispatch backend",
          "Google Sheets automated database bridge",
          "Email confirmation webhook automation",
        ],
      },
    ],
  },
  {
    id: "data",
    label: "Databases & Data Logic",
    icon: "database",
    breadcrumb: "PERSISTENCE / RELATIONAL MODELS",
    tools: [
      {
        id: "sql",
        name: "SQL & Relational Logic",
        subtitle: "DATABASE LOGIC",
        icon: "sql",
        status: "shipped",
        primary: true,
        projects: ["fintrack"],
        highlights: [
          "Relational entity schema modeling & normalization",
          "Transactional double-entry bookkeeping queries",
          "Parameterized data filtering & aggregate calculations",
        ],
      },
    ],
  },
  {
    id: "tooling",
    label: "Tooling & Workflow",
    icon: "wrench",
    breadcrumb: "ENGINEERING RIGOR & DEVOPS",
    tools: [
      {
        id: "git",
        name: "Git / GitHub",
        subtitle: "VERSION CONTROL",
        icon: "git",
        status: "shipped",
        primary: true,
        projects: ["arc", "devintel", "tunnel-flap"],
        highlights: [
          "Strict Conventional Commits message discipline",
          "Feature branch isolation & clean rebase workflows",
          "Repository issue tracking & release tagging",
        ],
      },
      {
        id: "devops",
        name: "DevOps & CI/CD",
        subtitle: "BUILD AUTOMATION",
        icon: "terminal",
        status: "learning",
        projects: [],
        highlights: [
          "GitHub Actions build & typecheck validation workflows",
          "Vercel automated preview & production pipelines",
          "Bundle size auditing & asset compression pipelines",
        ],
      },
    ],
  },
  {
    id: "cs",
    label: "Computer Science",
    icon: "brain",
    breadcrumb: "ALGORITHMS & FOUNDATIONS",
    tools: [
      {
        id: "java-dsa",
        name: "Java DSA",
        subtitle: "ALGORITHMS & STRUCTURES",
        icon: "java",
        status: "learning",
        primary: true,
        projects: ["arc"],
        highlights: [
          "Deliberate practice across Trees, Graphs & Dynamic Programming",
          "Time/Space complexity comparative benchmarking",
          "First-principles B.Tech CSE university coursework",
        ],
      },
    ],
  },
];
