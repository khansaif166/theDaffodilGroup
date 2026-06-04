"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2020",
    title: "The Daffodil Group Founded",
    description:
      "Established as a multi-sector holding entity with a vision to build globally competitive ventures.",
  },
  {
    year: "2021",
    title: "La' Daffodil Business Solutions Launched",
    description:
      "Advisory and market expansion services launched across India and UAE.",
  },
  {
    year: "2022",
    title: "Hayat Home Established",
    description:
      "Design-led interior architecture venture launched in Saudi Arabia.",
  },
  {
    year: "2023",
    title: "Yellow Saffron & The Reading Box",
    description:
      "Consumer and EdTech ventures added to the growing portfolio.",
  },
  {
    year: "2024",
    title: "West Africa Expansion",
    description:
      "Operations extended into West African markets, deepening cross-border capabilities.",
  },
  {
    year: "2025",
    title: "Daffodil Stories Goes Live",
    description:
      "Digital content and storytelling platform launched to serve the modern media economy.",
  },
];

export function OurJourneySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-milestone]", section);

      if (prefersReducedMotion) {
        gsap.set(lineRef.current, { scaleY: 1 });
        items.forEach((item) => {
          gsap.set(item.querySelector("[data-dot]"), { scale: 1 });
          gsap.set(item.querySelector("[data-content]"), { opacity: 1, x: 0 });
        });
        return;
      }

      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
      });

      items.forEach((item) => {
        const dot = item.querySelector("[data-dot]");
        const content = item.querySelector("[data-content]");

        gsap.set(dot, { scale: 0, transformOrigin: "center center" });
        gsap.set(content, { opacity: 0, x: 20 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            once: true,
          },
        });

        timeline.to(dot, {
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
        });

        timeline.to(
          content,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0.05,
        );
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${styles.sectionCream} ${styles.timelineSection}`}
    >
      <div className="container">
        <div className={styles.timelineHeader}>
          <span className={styles.sectionLabel}>Our Journey</span>
        </div>

        <div className={styles.timelineWrap}>
          <div className={styles.timelineTrack} />
          <div ref={lineRef} className={styles.timelineLine} />

          <div className={styles.timelineList}>
            {milestones.map((milestone) => (
              <article key={milestone.year} data-milestone className={styles.timelineItem}>
                <p className={styles.timelineYear}>{milestone.year}</p>
                <span data-dot className={styles.timelineDot} />
                <div data-content>
                  <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                  <p className={styles.timelineDescription}>{milestone.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
