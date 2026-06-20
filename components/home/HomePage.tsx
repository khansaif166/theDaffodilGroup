"use client";

import { useSetNavbarTheme } from "@/hooks/useSetNavbarTheme";

import { CtaSection } from "./CtaSection";
import { NumbersSection } from "./NumbersSection";
import { PresenceSection } from "./PresenceSection";
import { SectorsSection } from "./SectorsSection";
import { VenturesSection } from "./VenturesSection";
import { HeroSection } from "./sections/HeroSection";
import { WhyPartnerSection } from "./sections/WhyPartnerSection";

export function HomePage() {
  useSetNavbarTheme("dark");

  return (
    <main>
      <HeroSection />
      <NumbersSection />
      <SectorsSection />
      <VenturesSection />
      <PresenceSection />
      <CtaSection />
      <WhyPartnerSection />
    </main>
  );
}
