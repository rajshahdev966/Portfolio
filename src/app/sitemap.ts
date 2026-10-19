import { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { allProjects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lab`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: project.isFlagship ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
