import { z } from "zod";
import {
  Project,
  ProjectSchema,
  ProjectLinks,
  ProjectMetricSchema,
  ProjectMediaSchema,
  ProjectCaseStudySchema,
} from "../schema";

export type { Project, ProjectLinks };

export type ProjectMetric = z.infer<typeof ProjectMetricSchema>;
export type ProjectMedia = z.infer<typeof ProjectMediaSchema>;
export type ProjectCaseStudy = z.infer<typeof ProjectCaseStudySchema>;

/**
 * Custom link structure for any extra links (e.g. Kaggle dataset, Figma, Notion, Docs).
 */
export interface CustomLink {
  label: string;
  url: string;
  icon?: string;
}

/**
 * Flexible input definition for projects.
 * Fields with defaults (order, isFlagship, status, accentColor, metrics, media, caseStudy)
 * are optional when creating a quick project!
 */
export interface ProjectInput {
  /** Unique URL-friendly slug (e.g. "arc", "fintrack", "my-new-tool") */
  slug: string;

  /** Project display title */
  title: string;

  /** Catchy one-line subtitle explaining what it is */
  subtitle: string;

  /** Category badge (e.g. "Product", "Creative Frontend", "Developer Tools", "AI / ML", "Mobile") */
  category: string;

  /** Year created or active (e.g. "2026", "2025–Present") */
  year: string;

  /** Short elevator pitch / summary of the project */
  summary: string;

  /** Core technologies used (e.g. ["Next.js", "React", "TypeScript", "Tailwind CSS v4"]) */
  tags: string[];

  /**
   * Project external links:
   * Supports standard links (live, github, linkedIn) and custom data links (data, docs, demo, or custom list)
   */
  links?: {
    /** Live deployed application URL */
    live?: string;
    /** GitHub / GitLab source repository URL (e.g. "github.com/rajshah-dev/arc") */
    github?: string;
    /** Data source, Kaggle dataset, API endpoint, or data sheet link */
    data?: string;
    /** Documentation, Swagger, or API docs URL */
    docs?: string;
    /** Video demo, Loom, or YouTube walkthrough */
    demo?: string;
    /** LinkedIn announcement post */
    linkedIn?: string;
    /** Anchor or path to case study */
    caseStudy?: string;
    /** Any arbitrary custom links with label & URL */
    custom?: Array<{ label: string; url: string; icon?: string }>;
    /** Any other custom link string (e.g. figma, npm, report) */
    [key: string]: any;
  };

  /** Accent brand color hex (default: "#C6FF3D") */
  accentColor?: string;

  /** Display status badge text (default: "Live Product") */
  status?: string;

  /** Status type tag for styling (default: "live") */
  statusType?: "live" | "source" | "concept" | "experiment" | (string & {});

  /** Whether this project is featured as one of the flagship rows on the home page */
  isFlagship?: boolean;

  /** Display sort order (1, 2, 3...) */
  order?: number;

  /** Key metrics / numbers to highlight */
  metrics?: Array<{
    label: string;
    value: string;
    verified?: boolean;
  }>;

  /** Media assets: poster, screenshots, video demo */
  media?: {
    poster?: string;
    previewVideo?: string;
    isMediaPending?: boolean;
    beforeAfter?: {
      beforeSrc: string;
      afterSrc: string;
      beforeLabel: string;
      afterLabel: string;
    };
    screenshots?: Array<{
      src: string;
      caption: string;
    }>;
  };

  /**
   * Deep-dive Case Study sections (all optional with graceful fallbacks)
   */
  caseStudy?: {
    context?: string;
    problem?: string;
    constraints?: string[];
    decision?: string;
    implementation?: string[];
    tradeOffs?: string[];
    result?: string;
    learning?: string;
    architectureNotes?: string[];
  };
}

/**
 * Helper to define a project with full IDE autocompletion, type safety,
 * and automatic URL normalization (e.g. "www.google.com" -> "https://www.google.com").
 *
 * @example
 * export const myProject = defineProject({
 *   slug: "my-app",
 *   title: "My App",
 *   subtitle: "Real-time AI Assistant",
 *   category: "Developer Tools",
 *   year: "2026",
 *   summary: "Built to solve ...",
 *   tags: ["Next.js", "TypeScript"],
 *   links: {
 *     live: "https://my-app.vercel.app",
 *     github: "github.com/rajshah-dev/my-app",
 *     data: "https://api.github.com/my-dataset",
 *   },
 * });
 */
export function defineProject(input: ProjectInput): Project {
  // Normalize links if provided
  const normalizedLinks: Record<string, any> = { ...(input.links || {}) };

  for (const [key, val] of Object.entries(normalizedLinks)) {
    if (typeof val === "string" && val.trim()) {
      const trimmed = val.trim();
      if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://") && !trimmed.startsWith("/")) {
        normalizedLinks[key] = `https://${trimmed}`;
      }
    }
  }

  const rawProject = {
    ...input,
    accentColor: input.accentColor ?? "#C6FF3D",
    status: input.status ?? "Live Product",
    statusType: input.statusType ?? "live",
    isFlagship: input.isFlagship ?? false,
    order: input.order ?? 99,
    tags: input.tags ?? [],
    links: normalizedLinks,
    metrics: input.metrics ?? [],
    media: {
      poster: input.media?.poster ?? "/projects/placeholder.webp",
      isMediaPending: input.media?.isMediaPending ?? true,
      previewVideo: input.media?.previewVideo,
      beforeAfter: input.media?.beforeAfter,
      screenshots: input.media?.screenshots ?? [],
    },
    caseStudy: {
      context: input.caseStudy?.context ?? "",
      problem: input.caseStudy?.problem ?? "",
      constraints: input.caseStudy?.constraints ?? [],
      decision: input.caseStudy?.decision ?? "",
      implementation: input.caseStudy?.implementation ?? [],
      tradeOffs: input.caseStudy?.tradeOffs ?? [],
      result: input.caseStudy?.result ?? "",
      learning: input.caseStudy?.learning ?? "",
      architectureNotes: input.caseStudy?.architectureNotes,
    },
  };

  const parsed = ProjectSchema.safeParse(rawProject);
  if (!parsed.success) {
    console.warn(`[defineProject] Warning on project ${input.slug}:`, parsed.error.format());
    // Return the raw object cast as Project to avoid blocking the build
    return rawProject as unknown as Project;
  }

  return parsed.data;
}
