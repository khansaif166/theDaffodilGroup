"use client";

import { VenturesCta } from "./VenturesCta";
import { VenturesGrid } from "./VenturesGrid";
import { VenturesHero } from "./VenturesHero";

export function VenturesListingPage() {
  return (
    <>
      <VenturesHero />
      <VenturesGrid />
      <VenturesCta />
    </>
  );
}
