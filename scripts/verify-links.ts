import { allProjects } from "../src/content/projects";
import { siteConfig } from "../src/content/site";

async function checkUrl(url: string): Promise<{ url: string; status: number | string; ok: boolean }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    clearTimeout(timeout);
    return { url, status: res.status, ok: res.status < 400 || res.status === 403 || res.status === 405 || res.status === 429 };
  } catch (err: any) {
    return { url, status: err.name === "AbortError" ? "Timeout" : err.message, ok: false };
  }
}

async function verifyAllLinks() {
  console.log("🔍 Verifying all external URLs in Raj Shah Portfolio...\n");

  const urlsToCheck = new Set<string>();

  // Socials
  urlsToCheck.add(siteConfig.socials.linkedin);
  urlsToCheck.add(siteConfig.socials.github);

  // Projects
  allProjects.forEach((p) => {
    if (p.links.live) urlsToCheck.add(p.links.live);
    if (p.links.github) urlsToCheck.add(p.links.github);
    if (p.links.caseStudy && p.links.caseStudy.startsWith("http")) urlsToCheck.add(p.links.caseStudy);
  });

  const results = await Promise.all(Array.from(urlsToCheck).map(checkUrl));

  console.table(
    results.map((r) => ({
      URL: r.url.length > 50 ? r.url.substring(0, 47) + "..." : r.url,
      Status: r.status,
      Reachable: r.ok ? "✅ Yes" : "⚠️ Check Manually",
    }))
  );

  console.log("\nLink verification audit complete.");
}

verifyAllLinks();
