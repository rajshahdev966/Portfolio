import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site";
import { sortedProjects } from "@/content/projects";

export async function GET() {
  const content = `# ${siteConfig.name} — LLM Index
> ${siteConfig.positioningStatement}

## About
- Name: ${siteConfig.name}
- Role: ${siteConfig.role}
- Education: ${siteConfig.status}
- Canonical Domain: ${siteConfig.url}
- Public Email: ${siteConfig.canonicalEmail}
- Canonical LinkedIn: ${siteConfig.socials.linkedin}
- GitHub: ${siteConfig.socials.github}

## Core Projects & Case Studies
${sortedProjects
  .map(
    (p) => `- [${p.title}](${siteConfig.url}/work/${p.slug}): ${p.subtitle} [Status: ${p.status}, Stack: ${p.tags.slice(0, 4).join(", ")}]`
  )
  .join("\n")}

## Site Architecture
- Home: ${siteConfig.url}/
- About & Timeline: ${siteConfig.url}/about
- Interactive Lab: ${siteConfig.url}/lab
- Full Factual Dossier: ${siteConfig.url}/llms-full.txt
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
