"use client";

import { useEffect, useRef } from "react";
import { CountUp } from "countup.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useScrollReveal } from "@/lib";

import styles from "../HomePage.module.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 4, label: "Countries" },
  { value: 7, label: "Sectors" },
  { value: 5, label: "Ventures" },
  { value: 2020, label: "Est." },
];

export function CredibilityNumbersSection() {
  const sectionRef = useScrollReveal<HTMLElement>("fadeIn");
  const statRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!section) {
      return;
    }

    const counters = statRefs.current
      .map((node, index) => {
        if (!node) {
          return null;
        }

        return new CountUp(node, stats[index].value, {
          duration: 1.5,
          separator: ",",
          useEasing: true,
        });
      })
      .filter((counter): counter is CountUp => Boolean(counter));

    if (prefersReducedMotion) {
      statRefs.current.forEach((node, index) => {
        if (node) {
          node.textContent = `${stats[index].value}`;
        }
      });
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      once: true,
      onEnter: () => {
        counters.forEach((counter) => counter.start());
      },
    });

    return () => {
      trigger.kill();
      counters.forEach((counter) => counter.reset());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.statsSection} data-reveal="fadeIn">
      <div className={`container ${styles.statsGrid}`}>
        {stats.map((stat, index) => (
          <div key={stat.label} className={styles.statCard}>
            <span
              ref={(node) => {
                statRefs.current[index] = node;
              }}
              className={styles.statValue}
            >
              0
            </span>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
