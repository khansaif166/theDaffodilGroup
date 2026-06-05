"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import styles from "./VenturesCta.module.css";

gsap.registerPlugin(ScrollTrigger);

export function VenturesCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(contentRef.current, { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      gsap.set(contentRef.current, { opacity: 0, y: 30 });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
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
    <section ref={sectionRef} className={styles.section}>
      <div ref={contentRef} className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>Interested in partnering with us?</h2>
        <p className={styles.body}>
          Explore opportunities to collaborate with The Daffodil Group across
          ventures, growth platforms, and market-building initiatives.
        </p>
        <Link href="/contact/" className={styles.button}>
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
