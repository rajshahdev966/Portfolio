import { ImageResponse } from "next/og";
import { getProjectBySlug, getAllProjectSlugs } from "@/content/projects";

export const alt = "Case Study — Raj Shah Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title || "Case Study";
  const subtitle = project?.subtitle || "Design-Led Product Engineering";
  const category = project?.category || "Product";
  const status = project?.status || "Verified Project";
  const tags = project?.tags.slice(0, 4).join(" · ") || "Next.js · React · TypeScript";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0B",
          color: "#F4F4F0",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          border: "2px solid #26262B",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "#131316",
                border: "1px solid #26262B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C6FF3D",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              RS
            </div>
            <span style={{ fontSize: "20px", color: "#8A8A93", letterSpacing: "2px" }}>
              RAJ SHAH
            </span>
          </div>

          <div
            style={{
              padding: "6px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(198, 255, 61, 0.12)",
              border: "1px solid rgba(198, 255, 61, 0.4)",
              color: "#C6FF3D",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {status}
          </div>
        </div>

        {/* Center Title & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "22px", color: "#C6FF3D", textTransform: "uppercase" }}>
            {category}
          </div>
          <div style={{ fontSize: "68px", fontWeight: 800, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ fontSize: "26px", color: "#8A8A93", maxWidth: "900px" }}>
            {subtitle}
          </div>
        </div>

        {/* Bottom Bar: Stack & Domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #26262B",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#8A8A93",
          }}
        >
          <div>{tags}</div>
          <div style={{ color: "#C6FF3D" }}>rajshah.pro</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
