"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "./OurSectorsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const sectors = [
  {
    name: "Business Advisory & Strategic Consulting",
    description:
      "Helping businesses expand, transform, and thrive through market intelligence, governance frameworks, operational efficiency, and investment advisory.",
    icon: "design",
  },
  {
    name: "Interior Architecture & Fit-Out",
    description:
      "Designing and delivering exceptional residential, hospitality, commercial, and mixed-use environments.",
    icon: "construction",
  },
  {
    name: "Global Procurement",
    description:
      "Facilitating the sourcing and procurement of products, materials, and equipment from international and regional markets.",
    icon: "technology",
  },
  {
    name: "Entertainment, Technology & Digital Solutions",
    description:
      "Delivering innovative technology platforms, digital transformation services, smart solutions, and automation systems.",
    icon: "fmcg",
  },
  {
    name: "FMCG & Consumer Brands",
    description:
      "Developing premium consumer products focused on quality, sustainability, and market relevance.",
    icon: "fashion",
  },
  {
    name: "Education & Learning",
    description:
      "Creating impactful educational products and learning experiences for future generations.",
    icon: "advisory",
  },
  {
    name: "Wellness & Lifestyle",
    description:
      "Building wellness-focused brands that support healthier and more balanced lifestyles.",
    icon: "entertainment",
  },
];

type SectorIconName = (typeof sectors)[number]["icon"];

function SectorIcon({ icon }: { icon: SectorIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const icons: Record<SectorIconName, React.ReactNode> = {
    design: (
      <>
        <path {...common} d="M4 8h16v12H4z" />
        <path {...common} d="M8 4h12v12" />
      </>
    ),
    construction: (
      <>
        <path {...common} d="M5 20h14" />
        <path {...common} d="M8 20V9h8v11" />
        <path {...common} d="M11 9V5h7v15" />
      </>
    ),
    technology: (
      <>
        <rect {...common} x="6" y="6" width="12" height="12" rx="2" />
        <path {...common} d="M3 10h3M18 10h3M3 14h3M18 14h3M10 3v3M14 3v3M10 18v3M14 18v3" />
      </>
    ),
    fmcg: (
      <>
        <path {...common} d="M9 4h6" />
        <path {...common} d="M8 4v5l-2 11h12L16 9V4" />
      </>
    ),
    fashion: (
      <>
        <path {...common} d="M9 5l3 3 3-3 4 3-2 4-3-1v9H10v-9l-3 1-2-4z" />
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
        <rect {...common} x="4" y="6" width="16" height="12" rx="2" />
        <path {...common} d="m11 10 4 2.5-4 2.5z" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      {icons[icon]}
    </svg>
  );
}

export function OurSectorsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const principlesRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const principleCards = gsap.utils.toArray<HTMLElement>("[data-principle-card]", section);
      const cards = gsap.utils.toArray<HTMLElement>("[data-sector-card]", section);

      if (prefersReducedMotion) {
        gsap.set([principlesRef.current, introRef.current, principleCards, cards], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set(principlesRef.current, { opacity: 0, y: 20 });
      gsap.set(principleCards, { opacity: 0, y: 24 });
      gsap.set(introRef.current, { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 30 });

      gsap.to(principlesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(principleCards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: principlesRef.current,
          start: "top 84%",
          once: true,
        },
      });

      gsap.to(introRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          once: true,
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section id="sectors" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div ref={principlesRef} className={styles.principles}>
          <article data-principle-card className={styles.principleCard}>
            <span className={styles.principleLabel}>Our Vision</span>
            <p className={styles.principleBody}>
              To build globally respected enterprises that transform industries,
              empower communities, and contribute meaningfully to economic
              development.
            </p>
          </article>
          <article data-principle-card className={styles.principleCard}>
            <span className={styles.principleLabel}>Our Mission</span>
            <p className={styles.principleBody}>
              To create sustainable business ecosystems through innovation,
              strategic investments, operational excellence, and cross-border
              collaboration.
            </p>
          </article>
          <article data-principle-card className={styles.principleCard}>
            <span className={styles.principleLabel}>Our Values</span>
            <p className={styles.principleBody}>
              Integrity, Innovation, Excellence, Sustainability, Collaboration
            </p>
          </article>
        </div>

        <div ref={introRef} className={styles.intro}>
          <span className={styles.label}>What We Do</span>
          <h2 className={styles.heading}>Sectors we Serve</h2>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {sectors.map((sector) => (
            <article key={sector.name} data-sector-card className={styles.card}>
              <SectorIcon icon={sector.icon} />
              <h3 className={styles.name}>{sector.name}</h3>
              <p className={styles.description}>{sector.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
