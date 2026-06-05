import type { Metadata } from "next";

import {
  CtaSection,
  HeroSection,
  NumbersSection,
  PresenceSection,
  QuoteSection,
  SectorsSection,
  VenturesSection,
} from "@/components/home/page";
import { createPageMetadata } from "@/lib";

export const metadata: Metadata = createPageMetadata({
  title: "The Daffodil Group",
  description:
    "Explore The Daffodil Group, a premium multi-sector holding company building ventures across design, technology, FMCG, advisory, and global markets.",
  path: "/",
});

export default function HomePage() {
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
