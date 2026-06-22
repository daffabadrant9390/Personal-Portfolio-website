import { HeroSection } from "@/components/sections/landing/HeroSection";
import { AboutPreviewSection } from "@/components/sections/landing/AboutPreviewSection";
import { TechStackSection } from "@/components/sections/landing/TechStackSection";
import { FeaturedProjectsSection } from "@/components/sections/landing/FeaturedProjectsSection";
import { ContactCTASection } from "@/components/sections/landing/ContactCTASection";

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
