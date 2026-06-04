"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: "Capital Discipline",
    body: "We allocate capital with precision — funding only ventures that demonstrate clear strategic value and scalable potential.",
    icon: (
      <>
        <path d="M4 18h16" />
        <path d="M7 18v-7" />
        <path d="M12 18V8" />
        <path d="M17 18V5" />
        <path d="m14 8 3-3 3 3" />
      </>
    ),
  },
  {
    title: "Active Governance",
    body: "Beyond ownership, we are partners in execution — providing leadership, mentorship, and operational support to every business in our portfolio.",
    icon: (
      <>
        <path d="M12 3 6 5.5v5c0 4 2.4 7.3 6 8.5 3.6-1.2 6-4.5 6-8.5v-5z" />
        <path d="m9.5 11.5 1.8 1.8 3.6-3.8" />
      </>
    ),
  },
  {
    title: "Long-term Orientation",
    body: "We measure success in decades, not quarters. Every decision is made with sustainable, enduring value in mind.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
];

export function OurApproachSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-approach-card]", section);
      const rules = gsap.utils.toArray<HTMLElement>("[data-approach-rule]", section);

      if (prefersReducedMotion) {
        gsap.set([cards, rules], { opacity: 1, y: 0, width: 32 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.set(rules, { width: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      timeline.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      });

      timeline.to(
        rules,
        {
          width: 32,
          duration: 0.4,
          stagger: 0.15,
          ease: "power2.out",
        },
        0,
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} ${styles.sectionDark}`}>
      <div className="container">
        <div className={styles.approachIntro}>
          <span className={styles.sectionLabel}>How We Operate</span>
          <h2 className={`${styles.sectionHeading} ${styles.sectionHeadingLight}`}>
            Strategy with execution.
          </h2>
        </div>

        <div className={styles.approachGrid}>
          {principles.map((principle) => (
            <article key={principle.title} data-approach-card className={styles.approachCard}>
              <div data-approach-rule className={styles.approachRule} />
              <svg
                viewBox="0 0 24 24"
                className={styles.approachIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {principle.icon}
              </svg>
              <h3 className={styles.approachTitle}>{principle.title}</h3>
              <p className={styles.approachBody}>{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
