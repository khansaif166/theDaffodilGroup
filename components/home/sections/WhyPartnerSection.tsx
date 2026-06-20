"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "./WhyPartnerSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const partnerPoints = [
  "Multi-Sector Expertise",
  "Regional Market Intelligence",
  "Cross-Border Expansion Capabilities",
  "Strong Governance Frameworks",
  "Long-Term Partnership Approach",
];

export function WhyPartnerSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-partner-item]", section);

      if (prefersReducedMotion) {
        gsap.set([introRef.current, items], { opacity: 1, y: 0, x: 0 });
        return;
      }

      gsap.set(introRef.current, { opacity: 0, y: 20 });
      gsap.set(items, { opacity: 0, y: 24 });

      gsap.to(introRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 84%",
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
      <div className="container">
        <div ref={introRef} className={styles.intro}>
          <span className={styles.label}>Section 8</span>
          <h2 className={styles.heading}>WHY PARTNER WITH US</h2>
        </div>

        <div ref={listRef} className={styles.grid}>
          {partnerPoints.map((point) => (
            <article key={point} data-partner-item className={styles.card}>
              <span className={styles.marker} aria-hidden="true" />
              <p className={styles.point}>{point}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
