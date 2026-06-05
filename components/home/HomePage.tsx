"use client";

import { useSetNavbarTheme } from "@/hooks/useSetNavbarTheme";

import { CtaSection } from "./CtaSection";
import { NumbersSection } from "./NumbersSection";
import { PresenceSection } from "./PresenceSection";
import { QuoteSection } from "./QuoteSection";
import { SectorsSection } from "./SectorsSection";
import { VenturesSection } from "./VenturesSection";
import { HeroSection } from "./sections/HeroSection";

export function HomePage() {
  useSetNavbarTheme("dark");

  return (
    <main>
      <HeroSection />
      <NumbersSection />
      <QuoteSection />
      <SectorsSection />
      <VenturesSection />
      <PresenceSection />
      <CtaSection />
    </main>
  );
}
