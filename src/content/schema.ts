import { z } from "zod";

export const ProjectLinkSchema = z.object({
  live: z.string().url().optional(),
  github: z.string().url().optional(),
  caseStudy: z.string().optional(),
  linkedIn: z.string().url().optional(),
});

export const ProjectMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  verified: z.boolean(),
});

export const ProjectMediaSchema = z.object({
  previewVideo: z.string().optional(),
  poster: z.string(),
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
  context: z.string(),
  problem: z.string(),
  constraints: z.array(z.string()),
  decision: z.string(),
  implementation: z.array(z.string()),
  tradeOffs: z.array(z.string()),
  result: z.string(),
  learning: z.string(),
  architectureNotes: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  category: z.enum([
    "Product",
    "Creative Frontend",
    "React",
    "Browser Engineering",
    "Serverless",
    "Developer Tools",
  ]),
  year: z.string(),
  status: z.string(),
  statusType: z.enum(["live", "source", "concept", "experiment"]),
  summary: z.string(),
  accentColor: z.string().default("#C6FF3D"),
  tags: z.array(z.string()),
  links: ProjectLinkSchema,
  metrics: z.array(ProjectMetricSchema).default([]),
  media: ProjectMediaSchema,
  caseStudy: ProjectCaseStudySchema,
  isFlagship: z.boolean().default(false),
  order: z.number(),
});

export type Project = z.infer<typeof ProjectSchema>;

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
