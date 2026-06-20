"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "Integrity",
    body: "We conduct our business with honesty, transparency, and accountability, fostering trust and building lasting relationships with our stakeholders.",
  },
  {
    title: "Excellence",
    body: "We are committed to delivering the highest standards of quality through continuous learning, innovation, and a relentless pursuit of exceptional results.",
  },
  {
    title: "Collaboration",
    body: "We believe that meaningful partnerships and collective expertise create stronger businesses, greater opportunities, and shared success.",
  },
  {
    title: "Sustainability",
    body: "We embrace responsible business practices that create long-term value, promote sustainable growth, and contribute positively to society and future generations.",
  },
  {
    title: "Innovation",
    body: "We challenge conventional thinking, embrace new ideas, and leverage innovation to create solutions that drive progress and unlock new possibilities.",
  },
];

export function MissionVisionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const purposeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-principle-card]", section);

      if (prefersReducedMotion) {
        gsap.set([purposeRef.current, cards], { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(purposeRef.current, { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 28 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      timeline.to(purposeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      timeline.to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
        },
        0.12,
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} ${styles.sectionCream}`}>
      <div className="container">
        <div ref={purposeRef} className={styles.approachIntro}>
          <div className={styles.columnRule} />
          <span className={styles.columnLabel}>Our Purpose</span>
          <h2 className={styles.columnHeading}>We exist to create businesses that make a difference.</h2>
          <p className={styles.columnBody}>
            Our purpose is to build and nurture enterprises that generate
            economic value while creating positive social and commercial
            impacts. Through innovation, collaboration, and responsible growth,
            we aim to contribute to stronger communities, thriving industries,
            and sustainable economies.
          </p>
        </div>

        <div className={styles.approachIntro}>
          <span className={styles.sectionLabel}>Our Vision, Mission & Values</span>
        </div>

        <div className={styles.principlesGrid}>
          <article data-principle-card className={styles.principleCard}>
            <div className={styles.approachRule} />
            <h3 className={styles.columnHeading}>Our Vision</h3>
            <p className={styles.columnBody}>
              To be a globally respected enterprise recognized for building
              transformative businesses, fostering innovation, and creating
              sustainable value across industries and borders.
            </p>
          </article>

          <article data-principle-card className={styles.principleCard}>
            <div className={styles.approachRule} />
            <h3 className={styles.columnHeading}>Our Mission</h3>
            <p className={styles.columnBody}>
              To identify opportunities, build exceptional businesses, and
              create ecosystems that empower people, drive growth, and
              contribute to long-term prosperity through innovation, strategic
              partnerships, and operational excellence.
            </p>
          </article>

          <article
            data-principle-card
            className={`${styles.principleCard} ${styles.valuesCard}`}
          >
            <div className={styles.approachRule} />
            <h3 className={styles.columnHeading}>Our Values</h3>
            <div className={styles.valuesList}>
              {values.map((value) => (
                <div key={value.title} className={styles.valueItem}>
                  <h4 className={styles.valueTitle}>{value.title}</h4>
                  <p className={styles.valueBody}>{value.body}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
