"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "./PhilosophyQuoteSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export function PhilosophyQuoteSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const quoteRef = useRef<HTMLQuoteElement | null>(null);
  const attributionRef = useRef<HTMLParagraphElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([quoteRef.current, attributionRef.current], { opacity: 1, y: 0 });
        gsap.set(ruleRef.current, { width: 64 });
        return;
      }

      gsap.set([quoteRef.current, attributionRef.current], { opacity: 0, y: 30 });
      gsap.set(ruleRef.current, { width: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      timeline.to([quoteRef.current, attributionRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.08,
      });

      timeline.to(
        ruleRef.current,
        {
          width: 64,
          duration: 0.6,
          ease: "power2.out",
        },
        0.4,
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <blockquote ref={quoteRef} className={styles.quote}>
          We don&apos;t just build businesses. We build ecosystems that outlast trends and
          empower communities across borders.
        </blockquote>
        <p ref={attributionRef} className={styles.attribution}>
          — The Daffodil Group
        </p>
        <div ref={ruleRef} className={styles.rule} />
      </div>
    </section>
  );
}
