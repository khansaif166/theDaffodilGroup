"use client";

import { useScrollReveal } from "@/lib";

import styles from "../HomePage.module.css";
import type { Sector } from "../types";

const sectors: Sector[] = [
  {
    name: "Design & Interior Architecture",
    description: "Spatial experiences shaped with craft, restraint, and residential warmth.",
    icon: "design",
  },
  {
    name: "Construction & Fitout",
    description: "Execution capabilities that translate vision into high-fidelity environments.",
    icon: "construction",
  },
  {
    name: "Technology & Digital",
    description: "Digital products, content systems, and strategic platforms built for scale.",
    icon: "technology",
  },
  {
    name: "FMCG",
    description: "Consumer brands designed for recall, quality, and everyday relevance.",
    icon: "fmcg",
  },
  {
    name: "Textile & Fashion",
    description: "Fabric-led ventures balancing modern expression with commercial clarity.",
    icon: "fashion",
  },
  {
    name: "Business Advisory",
    description: "Commercial guidance across market entry, operations, and growth architecture.",
    icon: "advisory",
  },
  {
    name: "Entertainment",
    description: "Narrative-driven media and experiences that connect culture with audiences.",
    icon: "entertainment",
  },
];

function SectorIcon({ icon }: { icon: Sector["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const icons: Record<Sector["icon"], React.ReactNode> = {
    design: (
      <>
        <path {...common} d="M6 20h16" />
        <path {...common} d="M8 20V8l8-4 6 3v13" />
        <path {...common} d="M12 12h4" />
      </>
    ),
    construction: (
      <>
        <path {...common} d="M5 20h14" />
        <path {...common} d="M9 20V9h8v11" />
        <path {...common} d="M17 9V5h4v15" />
      </>
    ),
    technology: (
      <>
        <rect {...common} x="5" y="6" width="14" height="10" rx="2" />
        <path {...common} d="M10 20h4" />
        <path {...common} d="M12 16v4" />
      </>
    ),
    fmcg: (
      <>
        <path {...common} d="M10 4h4" />
        <path {...common} d="M9 4v6l-2 10h10l-2-10V4" />
      </>
    ),
    fashion: (
      <>
        <path {...common} d="M9 5l3 3 3-3 4 3-2 4-3-1v9H10v-9l-3 1-2-4 4-3Z" />
      </>
    ),
    advisory: (
      <>
        <path {...common} d="M6 18V9" />
        <path {...common} d="M12 18V5" />
        <path {...common} d="M18 18v-7" />
      </>
    ),
    entertainment: (
      <>
        <path {...common} d="M7 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
        <path {...common} d="m11 10 4 3-4 3v-6Z" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.sectorIcon}>
      {icons[icon]}
    </svg>
  );
}

export function OurSectorsSection() {
  const introRef = useScrollReveal<HTMLDivElement>("fadeUp");
  const gridRef = useScrollReveal<HTMLDivElement>("staggerChildren", { stagger: 0.08 });

  return (
    <section id="sectors" className={`${styles.sectionShell} ${styles.sectorsSection}`}>
      <div className="container">
        <div ref={introRef} className={styles.sectionIntro} data-reveal="fadeUp">
          <span className={styles.sectionLabel}>What We Do</span>
          <h2 className={styles.sectionHeading}>Seven sectors. One vision.</h2>
        </div>

        <div ref={gridRef} className={styles.sectorsGrid} data-reveal="staggerChildren">
          {sectors.map((sector) => (
            <article key={sector.name} className={styles.sectorCard}>
              <SectorIcon icon={sector.icon} />
              <h3 className={styles.sectorName}>{sector.name}</h3>
              <p className={styles.sectorDescription}>{sector.description}</p>
              <div className={styles.sectorBorder} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
