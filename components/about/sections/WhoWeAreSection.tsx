"use client";

import { useScrollReveal } from "@/lib";
import { PlaceholderImage } from "@/components";

import styles from "../AboutPage.module.css";

export function WhoWeAreSection() {
  const textRef = useScrollReveal<HTMLDivElement>("fadeUp");

  return (
    <section className={`${styles.section} ${styles.sectionWhite}`}>
      <div className={`container ${styles.whoGrid}`}>
        <div ref={textRef} data-reveal="fadeUp">
          <span className={styles.eyebrow}>Who We Are</span>
          <p className={styles.whoText}>
            The Daffodil Group is a multi-sector holding company built around a
            simple belief: businesses are strongest when they are treated as
            interconnected systems, not isolated bets. We work with conviction,
            patience, and operational intimacy to build ventures that are both
            commercially relevant and structurally durable. Our role is not only
            to fund growth, but to shape it through{" "}
            <span className={styles.underlineAccent}>clear governance and long-term thinking</span>,
            ensuring that every venture can mature with purpose across changing
            markets.
          </p>
        </div>

        <aside className={styles.stickyAside}>
          <div className={styles.asideImage}>
            <PlaceholderImage
              label="close-up of hands in meeting or signing document, editorial black and white"
              sizes="(max-width: 1024px) 100vw, 280px"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
