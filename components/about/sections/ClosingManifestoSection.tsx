"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "Built To Travel",
    body: "We shape ventures that can move across regions, adapt to local markets, and still retain a clear identity.",
  },
  {
    title: "Built To Compound",
    body: "Every business is structured for endurance, with governance and operating discipline that strengthen over time.",
  },
  {
    title: "Built With Intent",
    body: "We back ideas that feel useful in the real world, not just impressive on paper.",
  },
];

const signalPoints = ["India", "UAE", "Saudi Arabia", "West Africa"];

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
      const cards = gsap.utils.toArray<HTMLElement>("[data-manifesto-card]", section);
      const chips = gsap.utils.toArray<HTMLElement>("[data-manifesto-chip]", section);

      if (prefersReducedMotion) {
        gsap.set([intro, cards, chips], { opacity: 1, x: 0, y: 0, rotate: 0 });
        return;
      }

      gsap.set(intro, { opacity: 0, y: 28 });
      gsap.set(cards, { opacity: 0, y: 36, rotate: (index) => (index % 2 === 0 ? -2.5 : 2.5) });
      gsap.set(chips, { opacity: 0, y: 14 });

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
        cards,
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.7,
          stagger: 0.12,
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
          <span className={styles.sectionLabel}>The Daffodil Standard</span>
          <h2 className={`${styles.sectionHeading} ${styles.sectionHeadingLight} ${styles.manifestoHeading}`}>
            We build ventures with
            <span className={styles.manifestoAccent}> memory, margin, and momentum.</span>
          </h2>
          <p className={styles.manifestoBody}>
            The group exists to create businesses that feel sharp in the present and
            durable in the future, balancing market opportunity with operational
            seriousness.
          </p>

          <div className={styles.manifestoSignals}>
            {signalPoints.map((point) => (
              <span key={point} data-manifesto-chip className={styles.signalChip}>
                {point}
              </span>
            ))}
          </div>

          <Link href="/ventures/" className={styles.manifestoLink}>
            Explore our ventures
            <span className={styles.teamArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className={styles.manifestoStack}>
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              data-manifesto-card
              className={styles.manifestoCard}
              style={{ "--card-offset": `${index * 28}px` } as CSSProperties}
            >
              <span className={styles.manifestoIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.manifestoCardTitle}>{pillar.title}</h3>
              <p className={styles.manifestoCardBody}>{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
