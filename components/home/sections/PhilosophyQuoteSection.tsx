"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useScrollReveal } from "@/lib";

import styles from "../HomePage.module.css";

gsap.registerPlugin(ScrollTrigger);

export function PhilosophyQuoteSection() {
  const sectionRef = useScrollReveal<HTMLElement>("fadeUp");
  const ruleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rule = ruleRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!section || !rule) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(rule, { width: 60 });
      return;
    }

    const tween = gsap.to(rule, {
      width: 60,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.quoteSection} data-reveal="fadeUp">
      <div className={styles.quoteBlock}>
        <div ref={ruleRef} className={styles.quoteRule} />
        <blockquote className={styles.quoteText}>
          We don&apos;t just build businesses. We build ecosystems that outlast
          trends.
        </blockquote>
        <p className={styles.quoteAttribution}>— The Daffodil Group</p>
      </div>
    </section>
  );
}
