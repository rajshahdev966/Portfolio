import React from "react";
import { Loader } from "@/components/sections/Loader";
import { Hero } from "@/components/sections/Hero";
import { StatsTicker } from "@/components/sections/StatsTicker";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Process } from "@/components/sections/Process";
import { Toolbox } from "@/components/sections/Toolbox";
import { LabTeaser } from "@/components/sections/LabTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      {/* Session-Aware Signature DrawSVG Loader */}
      <Loader />

      {/* Hero: 3-Layer Depth Sandwich */}
      <Hero />

      {/* Verified Stats Strip & Stack Ticker */}
      <StatsTicker />

      {/* Selected Work: 6 Flagship Rows + Archive Table */}
      <SelectedWork />

      {/* Process: Pinned Horizontal Scrub 01–05 */}
      <Process />

      {/* Toolbox: Matter.js Physics Chip Pile */}
      <Toolbox />

      {/* Interactive Lab Sandbox Teaser */}
      <LabTeaser />

      {/* Build in Public Engineering Notes */}
      <Testimonials />

      {/* Contact Section: Directional Let's Talk */}
      <Contact />
    </>
  );
}
