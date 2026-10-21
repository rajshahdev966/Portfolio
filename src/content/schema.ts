import { z } from "zod";

// Helper that sanitizes URLs: if string starts with "www." or lacks protocol, auto-prepends https://
export const flexibleUrl = z
  .string()
  .trim()
  .transform((val) => {
    if (!val) return val;
    if (val.startsWith("http://") || val.startsWith("https://") || val.startsWith("/")) {
      return val;
    }
    return `https://${val}`;
  });

export const CustomLinkSchema = z.object({
  label: z.string(),
  url: flexibleUrl,
  icon: z.string().optional(),
});

export const ProjectLinkSchema = z
  .object({
    live: flexibleUrl.optional(),
    github: flexibleUrl.optional(),
    data: flexibleUrl.optional(), // Data link / dataset / API link
    caseStudy: z.string().optional(),
    linkedIn: flexibleUrl.optional(),
    docs: flexibleUrl.optional(),
    demo: flexibleUrl.optional(),
    custom: z.array(CustomLinkSchema).optional(),
  })
  .passthrough(); // allows any custom link key (e.g. figma, npm, report, etc.)

export const ProjectMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  verified: z.boolean().default(true),
});

export const ProjectMediaSchema = z.object({
  previewVideo: z.string().optional(),
  poster: z.string().default("/projects/placeholder.webp"),
  isMediaPending: z.boolean().default(true),
  beforeAfter: z
    .object({
      beforeSrc: z.string(),
      afterSrc: z.string(),
      beforeLabel: z.string(),
      afterLabel: z.string(),
    })
    .optional(),
  screenshots: z
    .array(
      z.object({
        src: z.string(),
        caption: z.string(),
      })
    )
    .default([]),
});

export const ProjectCaseStudySchema = z.object({
  context: z.string().default(""),
  problem: z.string().default(""),
  constraints: z.array(z.string()).default([]),
  decision: z.string().default(""),
  implementation: z.array(z.string()).default([]),
  tradeOffs: z.array(z.string()).default([]),
  result: z.string().default(""),
  learning: z.string().default(""),
  architectureNotes: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  category: z.string(), // Flexible: allows "Product", "Creative Frontend", "Developer Tools", "AI / ML", etc.
  year: z.string(),
  status: z.string().default("Live Product"),
  statusType: z.string().default("live"), // "live" | "source" | "concept" | "experiment" | custom
  summary: z.string(),
  accentColor: z.string().default("#C6FF3D"),
  tags: z.array(z.string()).default([]),
  links: ProjectLinkSchema.default({}),
  metrics: z.array(ProjectMetricSchema).default([]),
  media: ProjectMediaSchema.default({ poster: "/projects/placeholder.webp", isMediaPending: true, screenshots: [] }),
  caseStudy: ProjectCaseStudySchema.default({
    context: "",
    problem: "",
    constraints: [],
    decision: "",
    implementation: [],
    tradeOffs: [],
    result: "",
    learning: "",
  }),
  isFlagship: z.boolean().default(false),
  order: z.number().default(99),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectLinks = z.infer<typeof ProjectLinkSchema>;

export const TestimonialOrPostSchema = z.object({
  id: z.string(),
  author: z.string(),
  role: z.string(),
  companyOrContext: z.string(),
  content: z.string(),
  date: z.string(),
  url: z.string().url(),
  type: z.enum(["testimonial", "linkedin_post"]),
  takeaway: z.string().optional(),
});

export type TestimonialOrPost = z.infer<typeof TestimonialOrPostSchema>;

export const TimelineItemSchema = z.object({
  period: z.string(),
  title: z.string(),
  organization: z.string(),
  description: z.string(),
  category: z.enum(["education", "venture", "certification", "product"]),
  verified: z.boolean(),
  credentialUrl: z.string().url().optional(),
});

export type TimelineItem = z.infer<typeof TimelineItemSchema>;
