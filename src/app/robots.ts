import { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Permissive access for primary AI search and intelligence crawlers
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
