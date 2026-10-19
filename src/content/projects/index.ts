import { Project, ProjectSchema } from "../schema";
import { arcProject } from "./arc";
import { devintelProject } from "./devintel";
import { alchemyStoriesProject } from "./alchemy-stories";
import { tunnelFlapProject } from "./tunnel-flap";
import { gharProject } from "./ghar";
import { brewnestProject } from "./brewnest";
import { scenevaultProject } from "./scenevault";
import { urbannestProject } from "./urbannest";
import { fintrackProject } from "./fintrack";
import { stickyWallProject } from "./sticky-wall";

// Raw project list
const rawProjects: Project[] = [
  arcProject,
  devintelProject,
  alchemyStoriesProject,
  tunnelFlapProject,
  gharProject,
  brewnestProject,
  scenevaultProject,
  urbannestProject,
  fintrackProject,
  stickyWallProject,
];

// Validate all projects against Zod schema at runtime/build-time
export const allProjects: Project[] = rawProjects.map((p) => {
  const parsed = ProjectSchema.safeParse(p);
  if (!parsed.success) {
    console.error(`Invalid project schema for ${p.slug}:`, parsed.error);
    throw new Error(`Project schema error in ${p.slug}: ${parsed.error.message}`);
  }
  return parsed.data;
});

// Sorted by display order
export const sortedProjects = [...allProjects].sort((a, b) => a.order - b.order);

// Flagship projects for home page featured list (Rows 01 to 06)
export const flagshipProjects = sortedProjects.filter((p) => p.isFlagship);

// Archive projects for compact table
export const archiveProjects = sortedProjects.filter((p) => !p.isFlagship);

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return allProjects.map((p) => p.slug);
}
