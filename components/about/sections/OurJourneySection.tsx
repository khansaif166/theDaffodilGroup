"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useScrollReveal } from "@/lib";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2020",
    title: "The Group Takes Shape",
    description:
      "The Daffodil Group was established with a mandate to build a diversified holdings platform grounded in design, advisory, and measured expansion.",
  },
  {
    year: "2021",
    title: "Operational Foundations",
    description:
      "The group strengthened its operating frameworks, partnerships, and venture criteria to support more active stewardship across businesses.",
  },
  {
    year: "2022",
    title: "Portfolio Expansion",
    description:
      "New consumer and advisory opportunities were brought into the portfolio, broadening sector exposure while preserving strategic focus.",
  },
  {
    year: "2023",
    title: "Regional Presence",
    description:
      "The group deepened relationships across India, the Gulf, and West Africa, aligning ventures with regional demand and market access.",
  },
  {
    year: "2024",
    title: "Ecosystem Thinking",
    description:
      "The Daffodil Group increasingly positioned itself as a builder of connected platforms, where knowledge, distribution, and governance reinforce one another.",
  },
];

export function OurJourneySection() {
  const sectionRef = useScrollReveal<HTMLElement>("fadeUp");
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!section || !line) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(line, { scaleY: 1 });
      return;
    }

    const tween = gsap.to(line, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${styles.sectionCream}`}
      data-reveal="fadeUp"
    >
      <div className="container">
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>Our Story</span>
          <h2 className={styles.heading}>A journey built on patient expansion.</h2>
        </div>

        <div className={styles.timelineWrap}>
          <div className={styles.timelineTrack} />
          <div ref={lineRef} className={styles.timelineLine} />
          <div className={styles.timelineList}>
            {milestones.map((milestone) => (
              <article key={milestone.year} className={styles.timelineItem}>
                <span className={styles.timelineDot} />
                <p className={styles.timelineYear}>{milestone.year}</p>
                <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                <p className={styles.timelineDesc}>{milestone.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
