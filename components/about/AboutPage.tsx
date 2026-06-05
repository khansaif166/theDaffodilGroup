"use client";

import { useSetNavbarTheme } from "@/hooks/useSetNavbarTheme";

import { AboutHeroSection } from "./sections/AboutHeroSection";
import { ClosingManifestoSection } from "./sections/ClosingManifestoSection";
import { MissionVisionSection } from "./sections/MissionVisionSection";
import { OurApproachSection } from "./sections/OurApproachSection";
import { OurJourneySection } from "./sections/OurJourneySection";
import { WhoWeAreSection } from "./sections/WhoWeAreSection";

export function AboutPage() {
  useSetNavbarTheme("dark");

  return (
    <main>
      <AboutHeroSection />
      <MissionVisionSection />
      <WhoWeAreSection />
      <OurJourneySection />
      <OurApproachSection />
      <ClosingManifestoSection />
    </main>
  );
}
