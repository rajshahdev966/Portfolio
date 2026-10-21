import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "@/styles/tokens.css";
import { siteConfig } from "@/content/site";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/jsonld";
import { CalmModeProvider } from "@/hooks/usePrefersCalm";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { Analytics } from "@vercel/analytics/next";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Raj Shah — Building Interfaces That Feel Alive`,
    template: `Raj Shah`,
  },
  description: "Frontend engineer & product builder crafting cinematic, motion-driven web apps. Explore ARC, DEVIntel and Alchemy Stories.",
  keywords: [
    "Raj Shah",
    "Frontend Engineer",
    "Product Engineer",
    "Next.js",
    "React",
    "Nirma University",
    "Creative Developer",
    "Ahmedabad",
    "Obsidian Lime",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `Raj Shah — Building Interfaces That Feel Alive.`,
    description: "Frontend engineer & product builder crafting cinematic, motion-driven web apps. Explore ARC, DEVINTEL and Alchemy Stories.",
    siteName: siteConfig.name,
    images: [
      {
        url: "https://ik.imagekit.io/hqhsgjeub/Portfolio%20Images/oc-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Design-Led Product Engineering`,
    description: siteConfig.positioningStatement,
    creator: "@rajshahdev966",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = generatePersonSchema();
  const websiteJsonLd = generateWebSiteSchema();

  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0A0A0B] text-text font-sans antialiased selection:bg-accent selection:text-[#0A0A0B]">
        {/* Skip to Main Content Link for WCAG Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-[#0A0A0B] focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Subtle static film grain texture */}
        <div className="grain-overlay" aria-hidden="true" />

        <CalmModeProvider>
          <SmoothScrollProvider>
            {/* Fine Cursor for non-touch pointers */}
            <Cursor />

            {/* Navigation Header */}
            <Header />

            {/* Main Landmark */}
            <main id="main-content" className="relative flex min-h-screen flex-col pt-16">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </SmoothScrollProvider>
        </CalmModeProvider>

        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
