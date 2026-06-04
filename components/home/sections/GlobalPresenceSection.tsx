"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useScrollReveal } from "@/lib";

import styles from "../HomePage.module.css";

gsap.registerPlugin(ScrollTrigger);

export function GlobalPresenceSection() {
  const sectionRef = useScrollReveal<HTMLElement>("fadeIn");
  const mapRef = useScrollReveal<HTMLDivElement>("fadeUp");
  const [isMapActive, setIsMapActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!section) {
      return;
    }

    if (prefersReducedMotion) {
      setIsMapActive(true);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      once: true,
      onEnter: () => {
        setIsMapActive(true);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="presence"
      ref={sectionRef}
      className={`${styles.sectionShell} ${styles.presenceSection}`}
      data-reveal="fadeIn"
    >
      <div className={`container ${styles.presenceGrid}`}>
        <div>
          <span className={styles.sectionLabel}>Global Presence</span>
          <h2 className={`${styles.sectionHeading} ${styles.sectionHeadingLight}`}>
            Built for borders. Designed to scale.
          </h2>
        </div>

        <div
          ref={mapRef}
          className={`${styles.presenceMapWrap} ${isMapActive ? styles.mapActive : ""}`}
          data-reveal="fadeUp"
        >
          <svg
            viewBox="0 0 760 420"
            className={styles.presenceMap}
            role="img"
            aria-label="Simplified world map showing India, UAE, Saudi Arabia, and West Africa"
          >
            <path
              className={styles.mapOutline}
              d="M70 178c33-28 76-44 119-46 18 0 32-12 48-16 39-10 88 2 114 29 12 13 31 14 48 12 18-2 29-19 46-24 29-9 64 0 84 22 14 15 33 24 53 31 31 10 57 33 69 63-47 16-100 15-149 7-53-8-103-11-157 4-44 12-92 13-137 4-37-8-74-27-97-57-18-22-26-49-41-72Z"
            />
            <path
              className={styles.mapOutline}
              d="M275 137c10-16 24-28 42-34 14-5 30-4 45-4"
            />
            <path
              className={styles.mapOutline}
              d="M452 160c10-15 26-24 43-28 19-5 39-4 57 1"
            />
            <g className={styles.pulseGroup}>
              <circle className={styles.pulseDot} cx="485" cy="180" r="5" />
              <circle className={styles.pulseRing} cx="485" cy="180" r="5" />
              <text className={styles.mapLabel} x="499" y="176">
                UAE
              </text>
            </g>
            <g className={styles.pulseGroup}>
              <circle className={styles.pulseDot} cx="515" cy="170" r="5" />
              <circle className={styles.pulseRing} cx="515" cy="170" r="5" />
              <text className={styles.mapLabel} x="529" y="166">
                Saudi Arabia
              </text>
            </g>
            <g className={styles.pulseGroup}>
              <circle className={styles.pulseDot} cx="560" cy="218" r="5" />
              <circle className={styles.pulseRing} cx="560" cy="218" r="5" />
              <text className={styles.mapLabel} x="574" y="214">
                India
              </text>
            </g>
            <g className={styles.pulseGroup}>
              <circle className={styles.pulseDot} cx="362" cy="202" r="5" />
              <circle className={styles.pulseRing} cx="362" cy="202" r="5" />
              <text className={styles.mapLabel} x="284" y="198">
                West Africa
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
