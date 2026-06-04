"use client";

import { Button } from "@/components";
import { PlaceholderImage } from "@/components";
import { useScrollReveal } from "@/lib";

import styles from "../HomePage.module.css";

export function PartnerCTASection() {
  const sectionRef = useScrollReveal<HTMLElement>("fadeUp");

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.sectionShell} ${styles.ctaSection}`}
      data-reveal="fadeUp"
    >
      <div className={`container ${styles.ctaGrid}`}>
        <div>
          <span className={styles.sectionLabel}>Partner With Us</span>
          <h2 className={styles.sectionHeading}>Let&apos;s Build Something Together</h2>
          <p className={styles.sectionBody}>
            We partner with founders, operators, and institutions looking to
            shape ventures with long-term intent and regional depth.
          </p>
          <div className={styles.ctaActions}>
            <Button href="/#ventures" variant="secondary">
              Explore Ventures
            </Button>
            <Button href="/#contact">Get in Touch</Button>
          </div>
        </div>

        <div className={styles.ctaImage}>
          <PlaceholderImage
            label="handshake or meeting room, warm professional tone"
            sizes="(max-width: 1100px) 100vw, 52vw"
          />
        </div>
      </div>
    </section>
  );
}
