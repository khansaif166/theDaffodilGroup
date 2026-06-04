"use client";

import Link from "next/link";

import { useScrollReveal } from "@/lib";

import styles from "../AboutPage.module.css";

const leaders = [
  { name: "Aarav Menon", title: "Group Director", initials: "AM" },
  { name: "Sara Khan", title: "Portfolio Strategy Lead", initials: "SK" },
  { name: "Rohan Patel", title: "Operations & Growth", initials: "RP" },
];

export function LeadershipTeaserSection() {
  const gridRef = useScrollReveal<HTMLDivElement>("staggerChildren", { stagger: 0.08 });

  return (
    <section className={`${styles.section} ${styles.sectionWhite}`}>
      <div className="container">
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>Leadership</span>
          <h2 className={styles.heading}>A leadership culture built on stewardship.</h2>
        </div>

        <div ref={gridRef} className={styles.leadershipGrid} data-reveal="staggerChildren">
          {leaders.map((leader) => (
            <article key={leader.name} className={styles.leadershipCard}>
              <div className={styles.leaderVisual}>{leader.initials}</div>
              <h3 className={styles.leaderName}>{leader.name}</h3>
              <p className={styles.leaderTitle}>{leader.title}</p>
              <Link href="/team" className={styles.inlineLink}>
                Meet the team →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
