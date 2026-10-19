import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site";
import { sortedProjects } from "@/content/projects";

export async function GET() {
  const content = `# Full Factual Dossier — ${siteConfig.name}
Canonical URL: ${siteConfig.url}
Verified Email: ${siteConfig.canonicalEmail}
Verified LinkedIn: ${siteConfig.socials.linkedin}
GitHub: ${siteConfig.socials.github}

## Executive Profile
${siteConfig.shortBio}

- Education: ${siteConfig.status}
- Current Position: Undergraduate student & independent software builder
- Availability: ${siteConfig.availability}
- Core Positioning: "${siteConfig.positioningStatement}"

## Verified Projects Directory

${sortedProjects
  .map(
    (p, idx) => `### ${idx + 1}. ${p.title} (${p.year})
- Category: ${p.category}
- Status: ${p.status}
- One-line Summary: ${p.summary}
- Stack: ${p.tags.join(", ")}
- Live URL: ${p.links.live || "Pending"}
- Source Repository: ${p.links.github || "Private / On Request"}
- Case Study Context: ${p.caseStudy.context}
- Technical Problem: ${p.caseStudy.problem}
- Architectural Decision: ${p.caseStudy.decision}
- Key Takeaways: ${p.caseStudy.learning}
`
  )
  .join("\n")}

## Verified Timeline & Credentials
${siteConfig.timeline
  .map(
    (item) => `- **${item.period}**: ${item.title} — ${item.organization} (${item.description})`
  )
  .join("\n")}

## Verified FAQs
${siteConfig.faqs
  .map(
    (faq) => `### Q: ${faq.question}
A: ${faq.answer}
`
  )
  .join("\n")}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
