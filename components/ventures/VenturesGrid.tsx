"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { ventures } from "@/data/ventures";

import { VentureCard } from "./VentureCard";
import styles from "./VenturesGrid.module.css";

gsap.registerPlugin(ScrollTrigger);

export function VenturesGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-venture-card]", section);

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 40 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
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
      <div className={`container ${styles.grid}`}>
        {ventures.map((venture, index) => (
          <VentureCard
            key={venture.slug}
            venture={venture}
            variant={index < 2 ? "large" : "standard"}
          />
        ))}
      </div>
    </section>
  );
}
