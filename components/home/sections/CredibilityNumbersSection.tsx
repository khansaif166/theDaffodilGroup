"use client";

import { CountUp } from "countup.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "./CredibilityNumbersSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 4, label: "Countries" },
  { value: 7, label: "Sectors" },
  { value: 5, label: "Ventures" },
  { value: 2020, label: "Year Founded" },
];

export function CredibilityNumbersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const columns = gsap.utils.toArray<HTMLElement>("[data-stat-column]", section);
      const dividers = gsap.utils.toArray<HTMLElement>("[data-divider]", section);
      const counters = statRefs.current
        .map((node, index) => {
          if (!node) {
            return null;
          }

          return new CountUp(node, stats[index].value, {
            duration: 1.8,
            useEasing: true,
            separator: ",",
            startVal: 0,
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

      gsap.set(columns, { opacity: 0, y: 20 });
      gsap.set(dividers, { scaleY: 0, transformOrigin: "top center" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      timeline.to(columns, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
      });

      timeline.to(
        dividers,
        {
          scaleY: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.05,
      );

      counters.forEach((counter, index) => {
        timeline.call(() => counter.start(), undefined, index * 0.15);
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {stats.map((stat, index) => (
          <div key={stat.label} className={styles.columnWrap}>
            {index > 0 ? <span data-divider className={styles.divider} aria-hidden="true" /> : null}
            <div data-stat-column className={styles.column}>
              <span
                ref={(node) => {
                  statRefs.current[index] = node;
                }}
                className={styles.value}
              >
                0
              </span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
