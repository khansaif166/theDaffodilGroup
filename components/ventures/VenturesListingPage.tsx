"use client";

import { useSetNavbarTheme } from "@/hooks/useSetNavbarTheme";

import { VenturesCta } from "./VenturesCta";
import { VenturesGrid } from "./VenturesGrid";
import { VenturesHero } from "./VenturesHero";

export function VenturesListingPage() {
  useSetNavbarTheme("dark");

  return (
    <>
      <VenturesHero />
      <VenturesGrid />
      <VenturesCta />
    </>
  );
}
