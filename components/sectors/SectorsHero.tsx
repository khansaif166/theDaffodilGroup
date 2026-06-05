"use client";

import { useLayoutEffect, useRef } from "react";

import { PlaceholderImage } from "@/components";
import { siteImages } from "@/data/siteImages";
import { gsap } from "@/lib/gsap";

import styles from "./SectorsHero.module.css";

const headingLines = [
  [{ word: "Seven", italic: false }, { word: "sectors.", italic: false }],
  [{ word: "Built", italic: true }, { word: "with", italic: true }, { word: "intention.", italic: true }],
];

const microStats = ["7 Active Sectors", "5 Ventures", "4 Markets"];

export function SectorsHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const numeralRef = useRef<HTMLSpanElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-sector-hero-word]", section);

      if (prefersReducedMotion) {
        gsap.set(
          [imageRef.current, words, numeralRef.current, bodyRef.current, statsRef.current, labelRef.current],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clearProps: "all",
          },
        );
        return;
      }

      gsap.set(words, { opacity: 0, y: 38 });
      gsap.set(imageRef.current, { scale: 1.06 });
      gsap.set([labelRef.current, bodyRef.current, statsRef.current], { opacity: 0, y: 20 });
      gsap.set(numeralRef.current, { opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(imageRef.current, { scale: 1, duration: 1.2 }, 0)
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.45, delay: 0.1 })
        .to(
          words,
          {
            opacity: 1,
            y: 0,
            duration: 0.68,
            stagger: 0.07,
          },
          0.22,
        )
        .to(
          numeralRef.current,
          {
            opacity: 0.04,
            duration: 1.5,
            ease: "power1.out",
          },
          0.1,
        )
        .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.55 }, 0.9)
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.55 }, 1.02);
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.heroMedia}>
        <div ref={imageRef} className={styles.heroImage}>
          <PlaceholderImage
            src={siteImages.sectorsHero.src}
            alt={siteImages.sectorsHero.alt}
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <span ref={numeralRef} className={styles.numeral} aria-hidden="true">
          7
        </span>

        <div className={styles.content}>
          <div ref={labelRef} className={styles.meta}>
            <p className={styles.breadcrumb}>Home / Sectors</p>
            <p className={styles.label}>Our Capabilities</p>
          </div>

          <h1 className={styles.heading}>
            {headingLines.map((line, lineIndex) => (
              <span key={`line-${lineIndex}`} className={styles.headingLine}>
                {line.map(({ word, italic }) => (
                  <span
                    key={word}
                    data-sector-hero-word
                    className={`${styles.word} ${italic ? styles.wordItalic : ""}`}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p ref={bodyRef} className={styles.body}>
            The Daffodil Group operates across seven distinct sectors, each chosen
            for its growth potential, strategic alignment, and long-term value
            creation opportunity.
          </p>

          <div ref={statsRef} className={styles.stats} aria-label="Sectors overview statistics">
            {microStats.map((item) => (
              <span key={item} className={styles.stat}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
