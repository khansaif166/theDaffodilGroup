"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "./CredibilityNumbersSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export function CredibilityNumbersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(introRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(introRef.current, { opacity: 0, y: 20 });

      gsap.to(introRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={introRef} className={`container ${styles.intro}`}>
        <span className={styles.label}>Section 2</span>
        <h2 className={styles.heading}>A House of Visionary Enterprises</h2>
        <p className={styles.body}>
          The Daffodil Group is a privately held company founded on the belief that
          successful businesses should create a lasting impact. Through innovation,
          governance excellence, and strategic partnerships, we empower businesses
          to expand across borders and unlock new growth opportunities.
        </p>
      </div>
    </section>
  );
}
