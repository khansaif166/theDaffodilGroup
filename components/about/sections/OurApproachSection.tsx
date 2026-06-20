"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: "Business Advisory & Strategic Consulting",
    body: "",
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
    title: "Interior Architecture & Fit-Out",
    body: "",
    icon: (
      <>
        <path d="M12 3 6 5.5v5c0 4 2.4 7.3 6 8.5 3.6-1.2 6-4.5 6-8.5v-5z" />
        <path d="m9.5 11.5 1.8 1.8 3.6-3.8" />
      </>
    ),
  },
  {
    title: "Construction, Project Management & Procurement",
    body: "",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Technology & Digital Solutions",
    body: "",
    icon: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M3 10h3M18 10h3M3 14h3M18 14h3M10 3v3M14 3v3M10 18v3M14 18v3" />
      </>
    ),
  },
  {
    title: "FMCG & Consumer Brands",
    body: "",
    icon: (
      <>
        <path d="M9 4h6" />
        <path d="M8 4v5l-2 11h12L16 9V4" />
      </>
    ),
  },
  {
    title: "Education & Learning",
    body: "",
    icon: (
      <>
        <path d="M4 7.5 12 4l8 3.5-8 3.5-8-3.5Z" />
        <path d="M7 10.4v4.1c0 1.2 2.2 2.3 5 2.3s5-1.1 5-2.3v-4.1" />
      </>
    ),
  },
  {
    title: "Wellness & Lifestyle",
    body: "",
    icon: (
      <>
        <path d="M12 20s-6-3.7-6-9a3.5 3.5 0 0 1 6-2.3A3.5 3.5 0 0 1 18 11c0 5.3-6 9-6 9Z" />
      </>
    ),
  },
  {
    title: "Strategic Investments & Partnerships",
    body: "",
    icon: (
      <>
        <path d="M7 12h10" />
        <path d="M12 7v10" />
        <circle cx="12" cy="12" r="8" />
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
          <span className={styles.sectionLabel}>Our Portfolio</span>
          <h2 className={`${styles.sectionHeading} ${styles.sectionHeadingLight}`}>
            What We Do
          </h2>
          <p className={styles.approachBody}>
            Through our diverse portfolio, The Daffodil Group operates across
            key sectors that support economic development, innovation, and
            quality of life.
          </p>
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
              {principle.body ? <p className={styles.approachBody}>{principle.body}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
