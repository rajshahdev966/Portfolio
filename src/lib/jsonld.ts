import { siteConfig } from "@/content/site";
import { Project } from "@/content/schema";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.canonicalEmail,
    jobTitle: siteConfig.role,
    description: siteConfig.shortBio,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: siteConfig.university,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.x,
      siteConfig.socials.instagram,
    ],
    knowsAbout: [
      "Frontend Engineering",
      "React",
      "Next.js",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "WebGL",
      "Creative Development",
      "Data Structures and Algorithms",
      "Product Design",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: `${siteConfig.name} — Personal Portfolio`,
    description: siteConfig.positioningStatement,
    publisher: {
      "@id": `${siteConfig.url}/#person`,
    },
  };
}

export function generateProjectSchema(project: Project) {
  const isSoftware = ["Product", "React", "Browser Engineering", "Developer Tools"].includes(
    project.category
  );

  return {
    "@context": "https://schema.org",
    "@type": isSoftware ? "SoftwareApplication" : "CreativeWork",
    name: project.title,
    headline: project.subtitle,
    description: project.summary,
    url: `${siteConfig.url}/work/${project.slug}`,
    author: {
      "@id": `${siteConfig.url}/#person`,
    },
    datePublished: project.year,
    keywords: project.tags.join(", "),
    ...(isSoftware && {
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web Browser",
    }),
    ...(project.links.github && {
      codeRepository: project.links.github,
    }),
  };
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
