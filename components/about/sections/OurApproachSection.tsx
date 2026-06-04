"use client";

import { useScrollReveal } from "@/lib";

import styles from "../AboutPage.module.css";

const principles = [
  {
    title: "Capital Discipline",
    body: "We allocate with care, preferring durable opportunities over momentum-driven expansion.",
    icon: (
      <>
        <path d="M6 18h12" />
        <path d="M9 18V8h6v10" />
        <path d="M12 8V5" />
      </>
    ),
  },
  {
    title: "Active Governance",
    body: "We stay close to our ventures with practical oversight, clear decision-making, and long-view accountability.",
    icon: (
      <>
        <rect x="5" y="6" width="14" height="12" rx="2" />
        <path d="M9 10h6" />
        <path d="M9 14h6" />
      </>
    ),
  },
  {
    title: "Long-term Value",
    body: "Our aim is to shape ecosystems that strengthen over time rather than chase short-lived advantages.",
    icon: (
      <>
        <path d="M6 18c3-7 9-11 12-12" />
        <path d="M14 6h4v4" />
        <path d="M8 12c1.5 1.5 3 3 4 6" />
      </>
    ),
  },
];

export function OurApproachSection() {
  const gridRef = useScrollReveal<HTMLDivElement>("staggerChildren", { stagger: 0.1 });

  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className="container">
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>Our Approach</span>
          <h2 className={`${styles.heading} ${styles.headingLight}`}>
            Stewardship with conviction and restraint.
          </h2>
        </div>

        <div ref={gridRef} className={styles.principlesGrid} data-reveal="staggerChildren">
          {principles.map((principle) => (
            <article key={principle.title} className={styles.principleCard}>
              <svg
                viewBox="0 0 24 24"
                className={styles.principleIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {principle.icon}
              </svg>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleBody}>{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
