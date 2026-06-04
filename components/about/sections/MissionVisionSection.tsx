"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

export function MissionVisionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([leftRef.current, rightRef.current], { opacity: 1, x: 0 });
        return;
      }

      gsap.set(leftRef.current, { opacity: 0, x: -30 });
      gsap.set(rightRef.current, { opacity: 0, x: 30 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      timeline.to(
        leftRef.current,
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        0,
      );
      timeline.to(
        rightRef.current,
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        0,
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} ${styles.sectionCream}`}>
      <div className={`container ${styles.missionVisionGrid}`}>
        <div ref={leftRef} className={styles.missionColumn}>
          <div className={styles.columnRule} />
          <span className={styles.columnLabel}>Our Mission</span>
          <h2 className={styles.columnHeading}>Growing ventures that transform.</h2>
          <p className={styles.columnBody}>
            To grow transformative ventures across diverse sectors by combining
            strategic leadership, execution excellence, and global collaboration. We
            deliver impactful solutions, enable cross-border opportunities, and create
            long-term value.
          </p>
        </div>

        <div ref={rightRef} className={styles.missionColumn}>
          <div className={styles.columnRule} />
          <span className={styles.columnLabel}>Our Vision</span>
          <h2 className={styles.columnHeading}>A worldwide business ecosystem.</h2>
          <p className={styles.columnBody}>
            To establish The Daffodil Group as a worldwide business ecosystem that
            promotes innovation, nurtures strategic alliances, and generates
            sustainable value across industries — empowering communities and
            enterprises for generations.
          </p>
        </div>
      </div>
    </section>
  );
}
