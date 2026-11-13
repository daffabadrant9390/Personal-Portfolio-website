import { HeroSection } from "@/components/sections/landing/HeroSection";
import { AboutPreviewSection } from "@/components/sections/landing/AboutPreviewSection";
import { TechStackSection } from "@/components/sections/landing/TechStackSection";
import { FeaturedProjectsSection } from "@/components/sections/landing/FeaturedProjectsSection";
import { ContactCTASection } from "@/components/sections/landing/ContactCTASection";

import type { Metadata } from "next";

// The home page is the canonical "/" (the root layout no longer sets one for every page).
export const metadata: Metadata = { alternates: { canonical: "/" } };

// Featured projects and experience come from MySQL, so render per request.
export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutPreviewSection />
      <TechStackSection />
      <FeaturedProjectsSection />
      <ContactCTASection />
    </>
  );
}
