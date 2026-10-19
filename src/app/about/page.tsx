import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, GraduationCap, Briefcase, Award, Sparkles } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { generateFAQSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About & Engineering Timeline",
  description: siteConfig.shortBio,
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const faqJsonLd = generateFAQSchema();

  const timelineIcons = {
    education: GraduationCap,
    venture: Briefcase,
    certification: Award,
    product: Sparkles,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Back Navigation */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Header */}
          <header className="border-b border-line pb-12 mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                [ PROFILE & TIMELINE ]
              </span>
              <Badge variant="neutral" size="sm">
                Ahmedabad, India
              </Badge>
            </div>

            <h1 className="text-heading-1 font-bold uppercase tracking-tight text-text mb-6">
              About Raj Shah
            </h1>

            {/* Answer-First 40–60 Word Summary Paragraph (SEO & AI Search Optimized) */}
            <p className="font-display text-xl sm:text-2xl text-text font-semibold max-w-3xl leading-snug mb-6 border-l-2 border-accent pl-6">
              Raj Shah is a first-year Computer Science student at Nirma University, an entrepreneur-turned product builder, and a frontend-focused engineer. He builds expressive digital products, developer tools, and lean serverless applications—balancing design, engineering, and real human problems.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button href="/#contact" variant="primary" size="md" withArrow>
                Get in touch
              </Button>
              <Button href="/#work" variant="secondary" size="md">
                Explore builds
              </Button>
            </div>
          </header>

          {/* Core Philosophy Narrative */}
          <section className="mb-20">
            <h2 className="text-heading-3 font-bold text-text mb-6">
              The Founder-to-Engineer Mindset
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-sm sm:text-base text-muted leading-relaxed">
              <p>
                I started experimenting with digital products and marketing before university through Neurolearn Media. That early entrepreneurial experience taught me to think beyond the interface: who is the software actually for, what friction does it resolve, and what would make someone use it consistently?
              </p>
              <p>
                Today, as a first-year CSE undergraduate at Nirma University, I am pairing that product intuition with rigorous computer science foundations: data structures and algorithms in Java, asynchronous API modeling, DOM memory recycling, and lean serverless architecture.
              </p>
            </div>
          </section>

          {/* Capabilities Grouped by Outcomes */}
          <section className="mb-20 border-t border-line pt-16">
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block mb-1">
                CAPABILITIES
              </span>
              <h2 className="text-heading-2 font-bold uppercase text-text">
                What I Build & Deliver
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {siteConfig.capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-2xl border border-line bg-surface/40 p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-display text-xl font-bold text-text mb-2">
                      {cap.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed mb-6">
                      {cap.outcome}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-line/60">
                    {cap.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-accent/90 border border-accent/20 rounded px-2 py-0.5 bg-accent/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verified Timeline & Experience */}
          <section className="mb-20 border-t border-line pt-16">
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block mb-1">
                EXPERIENCE & LEARNING
              </span>
              <h2 className="text-heading-2 font-bold uppercase text-text">
                Timeline
              </h2>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-line flex flex-col gap-10">
              {siteConfig.timeline.map((item, idx) => {
                const Icon = timelineIcons[item.category] || Sparkles;
                return (
                  <div key={idx} className="relative group">
                    {/* Timeline bullet dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-surface text-accent group-hover:border-accent transition-colors">
                      <Icon className="h-3 w-3" />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-mono text-xs text-accent font-semibold mb-1">
                        {item.period}
                      </span>
                      <h3 className="font-display text-lg font-bold text-text">
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs text-muted-dim mb-2">
                        {item.organization}
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Structured FAQs */}
          <section className="border-t border-line pt-16">
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block mb-1">
                FAQ
              </span>
              <h2 className="text-heading-2 font-bold uppercase text-text">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-line">
              {siteConfig.faqs.map((faq, idx) => (
                <div key={idx} className="py-6">
                  <h3 className="font-display text-base sm:text-lg font-bold text-text mb-2">
                    {faq.question}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
