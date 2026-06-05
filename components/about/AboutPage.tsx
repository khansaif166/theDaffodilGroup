"use client";

import { useSetNavbarTheme } from "@/hooks/useSetNavbarTheme";

import { AboutHeroSection } from "./sections/AboutHeroSection";
import { LeadershipTeaserSection } from "./sections/LeadershipTeaserSection";
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
      <LeadershipTeaserSection />
    </main>
  );
}
