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
          <h2 className={styles.columnHeading}>Creating sustainable business ecosystems.</h2>
          <p className={styles.columnBody}>
            To create sustainable business ecosystems through innovation,
            strategic investments, operational excellence, and cross-border
            collaboration.
          </p>
        </div>

        <div ref={rightRef} className={styles.missionColumn}>
          <div className={styles.columnRule} />
          <span className={styles.columnLabel}>Our Vision</span>
          <h2 className={styles.columnHeading}>Globally respected enterprises.</h2>
          <p className={styles.columnBody}>
            To build globally respected enterprises that transform industries,
            empower communities, and contribute meaningfully to economic
            development.
          </p>
        </div>
      </div>
    </section>
  );
}
