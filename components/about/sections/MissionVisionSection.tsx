"use client";

import { useScrollReveal } from "@/lib";

import styles from "../AboutPage.module.css";

export function MissionVisionSection() {
  const gridRef = useScrollReveal<HTMLDivElement>("staggerChildren", { stagger: 0.1 });

  return (
    <section className={`${styles.section} ${styles.sectionCream}`}>
      <div className="container">
        <div ref={gridRef} className={styles.twoColCards} data-reveal="staggerChildren">
          <article className={styles.card}>
            <div className={styles.cardTop} />
            <h2 className={styles.cardTitle}>Our Mission</h2>
            <p className={styles.cardBody}>
              To build, back, and steward ventures with disciplined capital,
              active involvement, and a measured understanding of regional
              opportunity.
            </p>
          </article>

          <article className={styles.card}>
            <div className={styles.cardTop} />
            <h2 className={styles.cardTitle}>Our Vision</h2>
            <p className={styles.cardBody}>
              To shape a diversified holding group known for businesses that
              scale with integrity, adapt with intelligence, and create value
              that compounds over time.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
