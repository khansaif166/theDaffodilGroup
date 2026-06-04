"use client";

import Link from "next/link";

import { PlaceholderImage } from "@/components";
import { useScrollReveal } from "@/lib";
import { ventures } from "@/data/ventures";

import styles from "./VenturesPage.module.css";

export function VenturesListingPage() {
  const gridRef = useScrollReveal<HTMLDivElement>("staggerChildren", { stagger: 0.1 });

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Ventures</span>
          <h1 className={styles.heroHeading}>Our Portfolio</h1>
        </div>
      </section>

      <section className={styles.pageSection}>
        <div className="container">
          <div ref={gridRef} className={styles.listingGrid} data-reveal="staggerChildren">
            {ventures.map((venture) => (
              <Link
                key={venture.slug}
                href={`/ventures/${venture.slug}`}
                className={styles.listingCard}
              >
                <div className={styles.listingImage}>
                  <PlaceholderImage
                    label={venture.image}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className={styles.listingOverlay} />
                <div className={styles.listingContent}>
                  <span className={styles.sectorPill}>{venture.sector}</span>
                  <h2 className={styles.listingTitle}>{venture.name}</h2>
                  <p className={styles.listingBody}>{venture.tagline}</p>
                  <span className={styles.listingLink}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
