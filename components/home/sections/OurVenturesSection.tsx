"use client";

import Link from "next/link";

import { PlaceholderImage } from "@/components";
import { useScrollReveal } from "@/lib";

import styles from "../HomePage.module.css";
import type { Venture } from "../types";

const ventures: Venture[] = [
  {
    name: "La' Daffodil Business Solutions",
    description: "Advisory-led solutions helping ambitious businesses structure growth with clarity.",
    image: "[IMAGE: executive strategy session in refined boardroom setting]",
  },
  {
    name: "Hayat Home",
    description: "Interior experiences rooted in thoughtful materiality and elevated everyday living.",
    image: "[IMAGE: luxury living room with sculptural furniture and warm daylight]",
  },
  {
    name: "Yellow Saffron",
    description: "A contemporary FMCG brand balancing taste, trust, and modern packaging language.",
    image: "[IMAGE: premium packaged food arrangement with warm editorial styling]",
  },
  {
    name: "Daffodil Stories",
    description: "Digital-first storytelling and strategic content systems crafted for modern brands.",
    image: "[IMAGE: creative studio workspace with screens, notes, and cinematic lighting]",
  },
  {
    name: "The Reading Box",
    description: "EdTech designed to make learning engaging, curated, and beautifully accessible.",
    image: "[IMAGE: elegant reading corner with books, child learning tools, and soft light]",
  },
];

export function OurVenturesSection() {
  const introRef = useScrollReveal<HTMLDivElement>("fadeUp");
  const gridRef = useScrollReveal<HTMLDivElement>("staggerChildren", { stagger: 0.1 });

  return (
    <section id="ventures" className={`${styles.sectionShell} ${styles.venturesSection}`}>
      <div className="container">
        <div ref={introRef} className={styles.sectionIntro} data-reveal="fadeUp">
          <span className={styles.sectionLabel}>Our Ventures</span>
          <h2 className={styles.sectionHeading}>A portfolio built with range and restraint.</h2>
        </div>

        <div className={styles.mobileScroller}>
          <div ref={gridRef} className={styles.venturesGrid} data-reveal="staggerChildren">
            {ventures.map((venture) => (
              <article key={venture.name} className={styles.ventureCard}>
                <div className={styles.ventureImage}>
                  <PlaceholderImage
                    label={venture.image}
                    sizes="(max-width: 760px) 82vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.ventureContent}>
                  <h3 className={styles.ventureName}>{venture.name}</h3>
                  <p className={styles.ventureDescription}>{venture.description}</p>
                  <Link href="/#contact" className={styles.ventureLink}>
                    Discover More <span className={styles.ventureArrow}>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
