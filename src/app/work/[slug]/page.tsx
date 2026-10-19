import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Sparkles, CheckCircle2 } from "lucide-react";
import { getProjectBySlug, getAllProjectSlugs, sortedProjects } from "@/content/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MediaPendingCard } from "@/components/ui/MediaPendingCard";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { generateProjectSchema, generateBreadcrumbSchema } from "@/lib/jsonld";
import { siteConfig } from "@/content/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.summary,
    alternates: {
      canonical: `${siteConfig.url}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study | Raj Shah`,
      description: project.summary,
      url: `${siteConfig.url}/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Prev / Next Project Links
  const currentIndex = sortedProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? sortedProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < sortedProjects.length - 1 ? sortedProjects[currentIndex + 1] : null;

  const projectJsonLd = generateProjectSchema(project);
  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Work", url: `${siteConfig.url}/#work` },
    { name: project.title, url: `${siteConfig.url}/work/${project.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Back Navigation */}
          <div className="mb-12">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Project Hero Header */}
          <header className="border-b border-line pb-12 mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge
                variant={
                  project.statusType === "live"
                    ? "live"
                    : project.statusType === "source"
                    ? "source"
                    : "concept"
                }
                size="md"
                dot
              >
                {project.status}
              </Badge>
              <Badge variant="neutral" size="md">
                {project.category}
              </Badge>
              <span className="font-mono text-xs text-muted-dim">
                Year: {project.year}
              </span>
            </div>

            <h1 className="text-heading-1 font-bold uppercase tracking-tight text-text mb-4">
              {project.title}
            </h1>

            <p className="font-display text-xl sm:text-2xl text-muted max-w-3xl leading-snug mb-8">
              {project.subtitle}
            </p>

            {/* Links Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.links.live && (
                <Button
                  href={project.links.live}
                  isExternal
                  variant="primary"
                  size="md"
                  withArrow
                >
                  Live Deployment
                </Button>
              )}
              {project.links.github && (
                <Button
                  href={project.links.github}
                  isExternal
                  variant="outline"
                  size="md"
                  withArrow
                >
                  Source Code
                </Button>
              )}
              {project.links.linkedIn && (
                <Button
                  href={project.links.linkedIn}
                  isExternal
                  variant="ghost"
                  size="md"
                  withArrow
                >
                  LinkedIn Announcement
                </Button>
              )}
            </div>
          </header>

          {/* Main Case Study Body with Sticky Side Index */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sticky Scroll-Spy Side Navigation (4 cols) */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 flex flex-col gap-3 rounded-[20px] border border-line bg-surface/40 p-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">
                  Case Study Structure
                </span>
                <nav className="flex flex-col gap-2 font-mono text-xs text-muted">
                  <a href="#context" className="hover:text-text transition-colors">
                    01. Context & Background
                  </a>
                  <a href="#problem" className="hover:text-text transition-colors">
                    02. Problem & Friction
                  </a>
                  <a href="#constraints" className="hover:text-text transition-colors">
                    03. Key Constraints
                  </a>
                  <a href="#decision" className="hover:text-text transition-colors">
                    04. Architecture Decision
                  </a>
                  <a href="#implementation" className="hover:text-text transition-colors">
                    05. Implementation Flow
                  </a>
                  <a href="#tradeoffs" className="hover:text-text transition-colors">
                    06. Technical Trade-Offs
                  </a>
                  <a href="#result" className="hover:text-text transition-colors">
                    07. Verifiable Outcome
                  </a>
                  <a href="#learning" className="hover:text-text transition-colors">
                    08. Core Lesson
                  </a>
                </nav>

                {/* Tech Chips */}
                <div className="mt-6 pt-6 border-t border-line">
                  <span className="font-mono text-[10px] uppercase text-muted-dim block mb-3">
                    Technologies Used
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-muted border border-line rounded px-2 py-0.5 bg-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* 8-Part Case Study Details (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-16">
              {/* Media Showcase: Media Pending Card or Real Before/After Slider */}
              <section aria-label="Visual Overview">
                {project.media.beforeAfter ? (
                  <BeforeAfterSlider
                    beforeSrc={project.media.beforeAfter.beforeSrc}
                    afterSrc={project.media.beforeAfter.afterSrc}
                    beforeLabel={project.media.beforeAfter.beforeLabel}
                    afterLabel={project.media.beforeAfter.afterLabel}
                  />
                ) : (
                  <MediaPendingCard
                    projectTitle={project.title}
                    assetName={project.media.poster}
                    aspectRatio="video"
                    note="Screen capture pending. Architecture verified against active codebase."
                  />
                )}
              </section>

              {/* 1. Context */}
              <section id="context" className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                  01 / CONTEXT
                </span>
                <h2 className="text-heading-3 font-bold text-text">
                  What was this and who was it for?
                </h2>
                <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
                  {project.caseStudy.context}
                </p>
              </section>

              {/* 2. Problem */}
              <section id="problem" className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                  02 / PROBLEM
                </span>
                <h2 className="text-heading-3 font-bold text-text">
                  What was broken, frustrating, or missing?
                </h2>
                <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
                  {project.caseStudy.problem}
                </p>
              </section>

              {/* 3. Constraints */}
              <section id="constraints" className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                  03 / CONSTRAINTS
                </span>
                <h2 className="text-heading-3 font-bold text-text">
                  Design & Platform Boundaries
                </h2>
                <ul className="flex flex-col gap-2.5 mt-2">
                  {project.caseStudy.constraints.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-sans text-sm text-muted">
                      <span className="font-mono text-xs text-accent mt-0.5">[{idx + 1}]</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 4. Decision */}
              <section id="decision" className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                  04 / DECISION
                </span>
                <h2 className="text-heading-3 font-bold text-text">
                  Architectural & UX Strategy
                </h2>
                <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
                  {project.caseStudy.decision}
                </p>
              </section>

              {/* 5. Implementation */}
              <section id="implementation" className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                  05 / IMPLEMENTATION
                </span>
                <h2 className="text-heading-3 font-bold text-text">
                  Execution Highlights
                </h2>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {project.caseStudy.implementation.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-line bg-surface/40 p-4"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                      <span className="font-sans text-xs sm:text-sm text-text/90 leading-relaxed">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. Trade-offs */}
              <section id="tradeoffs" className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                  06 / TRADE-OFFS
                </span>
                <h2 className="text-heading-3 font-bold text-text">
                  What was compromised & what was gained?
                </h2>
                <ul className="flex flex-col gap-2.5 mt-2">
                  {project.caseStudy.tradeOffs.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-sans text-sm text-muted">
                      <span className="text-line-bright font-bold">/</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 7. Real Outcome */}
              <section id="result" className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                  07 / OUTCOME
                </span>
                <h2 className="text-heading-3 font-bold text-text">
                  Verifiable Outcome
                </h2>
                <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
                  {project.caseStudy.result}
                </p>
              </section>

              {/* 8. What I Learned */}
              <section
                id="learning"
                className="flex flex-col gap-3 rounded-[20px] border border-accent/40 bg-accent/5 p-6 sm:p-8"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                    08 / WHAT CHANGED IN MY THINKING
                  </span>
                </div>
                <blockquote className="font-display text-lg sm:text-xl text-text font-semibold leading-relaxed italic">
                  "{project.caseStudy.learning}"
                </blockquote>
              </section>
            </div>
          </div>

          {/* Prev / Next Pagination */}
          <nav
            aria-label="Previous or next project pagination"
            className="mt-24 pt-12 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            {prevProject ? (
              <Link
                href={`/work/${prevProject.slug}`}
                className="group flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-muted-dim">Previous Project</span>
                  <span className="font-display text-base font-bold text-text group-hover:text-accent">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors sm:text-right"
              >
                <div className="flex flex-col sm:text-right">
                  <span className="text-[10px] text-muted-dim">Next Project</span>
                  <span className="font-display text-base font-bold text-text group-hover:text-accent">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </article>
    </>
  );
}
