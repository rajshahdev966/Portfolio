import { Project, ProjectSchema } from "../schema";

// Re-export developer helper and types for easy authoring:
export { defineProject } from "./types";
export type {
  Project,
  ProjectInput,
  ProjectLinks,
  ProjectMetric,
  ProjectMedia,
  ProjectCaseStudy,
  CustomLink,
} from "./types";

declare const require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys(): string[];
    (id: string): any;
  };
};

// Webpack require.context:
// Automatically scans this directory for all project files (*.ts except index, types, _template).
// When you delete a file (e.g. tunnel-flap.ts) or add a new one, Webpack picks it up automatically.
const projectContext = require.context(
  "./",
  false,
  /^\.\/(?!index|types|_template).*\.ts$/
);

const rawProjects: Project[] = projectContext
  .keys()
  .map((key: string) => {
    try {
      const mod = projectContext(key);
      const proj =
        (mod.default && mod.default.slug ? mod.default : null) ||
        Object.values(mod).find(
          (val: any) =>
            val &&
            typeof val === "object" &&
            "slug" in val &&
            "title" in val &&
            "category" in val
        );

      return proj as Project;
    } catch (err) {
      console.warn(`[projects] Failed to load project from ${key}:`, err);
      return null;
    }
  })
  .filter((p): p is Project => Boolean(p && typeof p === "object" && "slug" in p));

// Validate all projects against Zod schema at runtime/build-time
export const allProjects: Project[] = rawProjects
  .map((p) => {
    const parsed = ProjectSchema.safeParse(p);
    if (!parsed.success) {
      console.warn(
        `[projects] Warning: Project ${p.slug} has schema discrepancies:`,
        parsed.error.format()
      );
      return p;
    }
    return parsed.data;
  })
  .filter(Boolean);

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
