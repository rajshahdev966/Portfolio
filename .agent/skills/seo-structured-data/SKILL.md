---
name: seo-structured-data
description: Technical SEO, JSON-LD structured data schemas, Open Graph cards, sitemap, robots, and AI search (AIEO/GEO) readiness.
---

# SEO & Structured Data Skill

## Core Principles
1. **Schema Graph (JSON-LD)**:
   - `Person`: name "Raj Shah", jobTitle "Frontend & Product Engineer", url "https://rajshah.pro", address Locality "Ahmedabad", Country "IN", alumniOf/affiliation "Nirma University", sameAs (GitHub, LinkedIn, X, Instagram).
   - `WebSite`: name "Raj Shah Portfolio", url "https://rajshah.pro".
   - `ProfilePage`: for `/about`.
   - `SoftwareApplication` / `CreativeWork` / `SoftwareSourceCode`: per project, strictly reflecting verified metadata.
   - `FAQPage`: for structured questions & answers on the home / about page.
2. **Metadata API**:
   - Unique title template: `%s | Raj Shah — Design-Led Product Engineering`.
   - Concise, factual meta descriptions (under 160 characters).
   - Dynamic Open Graph and Twitter cards using `opengraph-image.tsx`.
   - Explicit canonical URL on every page.
3. **AI Search Optimization (AIEO / GEO)**:
   - Provide `/llms.txt`: concise index of the portfolio, capabilities, and verified projects.
   - Provide `/llms-full.txt`: complete factual dossier with project context, verified technical facts, and links.
   - Answer-first 40–60 word summary paragraph for crawler comprehension.
   - Permissive `robots.txt` allowing AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).

## Rules
- All structured data must validate against Schema.org specifications without syntax errors.
- Never invent citations, false awards, fake user counts, or fake reviews in schema tags.

## Do-Nots
- Do not hide text purely for search engines (no keyword stuffing).
- Do not render meta tags via client-side JavaScript DOM injection; use Next.js Server Components.
