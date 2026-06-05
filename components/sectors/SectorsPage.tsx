"use client";

import { sectors } from "@/data/sectors";
import { useSetNavbarTheme } from "@/hooks/useSetNavbarTheme";
import { useEffect, useState } from "react";

import { SectorBlock } from "./SectorBlock";
import { SectorsBottomCta } from "./SectorsBottomCta";
import { SectorsHero } from "./SectorsHero";
import { SectorsIndexBar } from "./SectorsIndexBar";

export function SectorsPage() {
  useSetNavbarTheme("dark");
  const [activeSectorId, setActiveSectorId] = useState(sectors[0].id);

  useEffect(() => {
    const sectionElements = sectors
      .map((sector) => document.getElementById(sector.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSectorId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <SectorsHero />
      <SectorsIndexBar
        activeId={activeSectorId}
        items={sectors.map(({ id, name }) => ({ id, name }))}
      />
      {sectors.map((sector) => (
        <SectorBlock key={sector.id} sector={sector} />
      ))}
      <SectorsBottomCta />
    </main>
  );
}
