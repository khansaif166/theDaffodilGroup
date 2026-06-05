"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

import styles from "./SectorsBottomCta.module.css";

export function SectorsBottomCta() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-cta-item]", section);

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      gsap.set(items, { opacity: 0, y: 20 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
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
      <div className={`container ${styles.inner}`}>
        <p data-cta-item className={styles.label}>
          Partner With Us
        </p>
        <h2 data-cta-item className={styles.heading}>
          Operating in one of these sectors?
        </h2>
        <p data-cta-item className={styles.body}>
          Whether you&apos;re a business looking for a strategic partner, an investor
          exploring our portfolio, or a brand seeking to enter new markets, we
          want to hear from you.
        </p>

        <div data-cta-item className={styles.actions}>
          <Link href="/contact/" className={styles.primary}>
            Start a Conversation
          </Link>
          <Link href="/ventures/" className={styles.secondary}>
            <span>View Our Ventures</span>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
