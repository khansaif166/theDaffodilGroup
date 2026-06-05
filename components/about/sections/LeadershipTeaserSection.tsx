"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const leaders = [
  { name: "Aarav Menon", title: "Group Director", initials: "AM" },
  { name: "Sara Khan", title: "Portfolio Strategy Lead", initials: "SK" },
  { name: "Rohan Patel", title: "Operations & Growth", initials: "RP" },
  { name: "Nadia Rahman", title: "Regional Development", initials: "NR" },
];

export function LeadershipTeaserSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-leader-card]", section);

      if (cards.length === 0) {
        return;
      }

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 20 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} ${styles.sectionWhite}`}>
      <div className="container">
        <div className={styles.leadershipIntro}>
          <span className={styles.sectionLabel}>The People Behind The Group</span>
          <h2 className={styles.sectionHeading}>Leadership built on experience.</h2>
        </div>

        <div className={styles.leadershipScroller}>
          <div className={styles.leadershipGrid}>
            {leaders.map((leader) => (
              <article key={leader.name} data-leader-card className={styles.leaderCard}>
                <div className={styles.leaderVisual}>{leader.initials}</div>
                <h3 className={styles.leaderName}>{leader.name}</h3>
                <div className={styles.leaderUnderline} />
                <p className={styles.leaderTitle}>{leader.title}</p>
              </article>
            ))}
          </div>
        </div>

        <Link href="/team" className={styles.teamLink}>
          <span>Meet the full team</span>
          <span className={styles.teamArrow}>→</span>
        </Link>
      </div>
    </section>
  );
}
