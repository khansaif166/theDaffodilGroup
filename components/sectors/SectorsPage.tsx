"use client";

import { useState } from "react";

import { useScrollReveal } from "@/lib";
import { sectors } from "@/data/sectors";

import styles from "./SectorsPage.module.css";

export function SectorsPage() {
  const [openSlug, setOpenSlug] = useState(sectors[0].slug);
  const introRef = useScrollReveal<HTMLDivElement>("fadeUp");
  const listRef = useScrollReveal<HTMLDivElement>("staggerChildren", { stagger: 0.08 });

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Sectors</span>
          <h1 className={styles.heading}>Where we build.</h1>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div ref={introRef} className={styles.intro} data-reveal="fadeUp">
            <span className={styles.eyebrow}>Sector Coverage</span>
            <p className={styles.body}>
              Our sector focus reflects a portfolio philosophy built on range,
              adjacency, and disciplined expansion. Each vertical is treated as
              part of a broader operating ecosystem.
            </p>
          </div>

          <div ref={listRef} className={styles.accordion} data-reveal="staggerChildren">
            {sectors.map((sector) => {
              const isOpen = sector.slug === openSlug;

              return (
                <article key={sector.slug} className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionButton}
                    aria-expanded={isOpen}
                    onClick={() => setOpenSlug(isOpen ? "" : sector.slug)}
                  >
                    <div>
                      <h2 className={styles.accordionTitle}>{sector.name}</h2>
                      <p className={styles.accordionSummary}>{sector.summary}</p>
                    </div>
                    <span className={styles.accordionToggle}>{isOpen ? "−" : "+"}</span>
                  </button>

                  <div
                    className={`${styles.accordionPanel} ${isOpen ? styles.accordionPanelOpen : ""}`}
                  >
                    <div className={styles.accordionInner}>
                      <div className={styles.accordionContent}>
                        <p className={styles.accordionDescription}>{sector.description}</p>
                        <div className={styles.capabilities}>
                          {sector.capabilities.map((capability) => (
                            <span key={capability} className={styles.capability}>
                              {capability}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
