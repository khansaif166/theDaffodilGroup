"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const signalPoints = [
  "Saudi Arabia",
  "United Arab Emirates",
  "India",
  "Emerging Markets",
];

const locations = [
  {
    country: "India",
    left: "70.5%",
    top: "45.2%",
    placement: "Right",
  },
  {
    country: "UAE",
    left: "61.6%",
    top: "43%",
    placement: "Above",
  },
  {
    country: "Saudi Arabia",
    left: "58.4%",
    top: "44.8%",
    placement: "Left",
  },
];

export function ClosingManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const intro = section.querySelector<HTMLElement>("[data-manifesto-intro]");
      const visual = section.querySelector<HTMLElement>("[data-manifesto-visual]");
      const chips = gsap.utils.toArray<HTMLElement>("[data-manifesto-chip]", section);
      const markers = gsap.utils.toArray<HTMLElement>("[data-presence-marker]", section);

      if (prefersReducedMotion) {
        gsap.set([intro, visual, chips, markers], { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 });
        return;
      }

      gsap.set(intro, { opacity: 0, y: 28 });
      gsap.set(visual, { opacity: 0, x: 24 });
      gsap.set(chips, { opacity: 0, y: 14 });
      gsap.set(markers, { opacity: 0, scale: 0.8 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      timeline.to(intro, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
      });

      timeline.to(
        visual,
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: "power2.out",
        },
        0.12,
      );

      timeline.to(
        chips,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.45,
      );

      timeline.to(
        markers,
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.3,
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${styles.manifestoSection}`}
    >
      <div className={styles.manifestoGlow} aria-hidden="true" />
      <div className={`container ${styles.manifestoGrid}`}>
        <div data-manifesto-intro className={styles.manifestoIntro}>
          <span className={styles.sectionLabel}>Our Global Presence</span>
          <h2 className={`${styles.sectionHeading} ${styles.sectionHeadingLight} ${styles.manifestoHeading}`}>
            Bridging opportunities
            <span className={styles.manifestoAccent}> across regions.</span>
          </h2>
          <p className={styles.manifestoBody}>
            With operations, partnerships, and business interests spanning
            Saudi Arabia, the United Arab Emirates, India, and emerging
            international markets, The Daffodil Group is uniquely positioned to
            bridge opportunities across regions.
          </p>
          <p className={styles.manifestoBody}>
            Our understanding of diverse business environments enables us to
            support organizations seeking growth, expansion, and market access
            while navigating the complexities of an increasingly interconnected
            global economy.
          </p>

          <div className={styles.manifestoSignals}>
            {signalPoints.map((point) => (
              <span key={point} data-manifesto-chip className={styles.signalChip}>
                {point}
              </span>
            ))}
          </div>
        </div>

        <div data-manifesto-visual className={styles.presenceVisual}>
          <div className={styles.presenceMapFrame}>
            <img
              src="/images/world-map-presence.png"
              alt="World map showing The Daffodil Group global presence"
              className={styles.presenceMap}
            />

            {locations.map((location) => (
              <div
                key={location.country}
                data-presence-marker
                className={styles.presenceMarker}
                style={{ left: location.left, top: location.top }}
              >
                <span className={styles.presenceDot} />
                <span
                  className={`${styles.presenceLabel} ${
                    styles[`presenceLabel${location.placement}`]
                  }`}
                >
                  {location.country}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.presenceLegend}>
            <div className={styles.presenceLegendItem}>
              <span className={styles.presenceLegendTitle}>Core Regions</span>
              <span className={styles.presenceLegendText}>Saudi Arabia · UAE · India</span>
            </div>
            <div className={styles.presenceLegendItem}>
              <span className={styles.presenceLegendTitle}>Expansion Lens</span>
              <span className={styles.presenceLegendText}>Emerging international markets</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
