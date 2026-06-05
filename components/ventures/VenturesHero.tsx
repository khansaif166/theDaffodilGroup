"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

import { PlaceholderImage } from "@/components";
import { siteImages } from "@/data/siteImages";

import styles from "./VenturesHero.module.css";

const headingWords = ["Our", "Portfolio."];

export function VenturesHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const subheadingRef = useRef<HTMLParagraphElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-hero-word]", section);

      if (prefersReducedMotion) {
        gsap.set([imageRef.current, words, subheadingRef.current, bodyRef.current, ruleRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
        return;
      }

      gsap.set(words, { opacity: 0, y: 34 });
      gsap.set(imageRef.current, { scale: 1.06 });
      gsap.set([subheadingRef.current, bodyRef.current, ruleRef.current], {
        opacity: 0,
        y: 20,
      });

      gsap.to(imageRef.current, {
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.07,
        delay: 0.4,
        ease: "power2.out",
      });

      gsap.to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.7,
        ease: "power2.out",
      });

      gsap.to(bodyRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 1,
        ease: "power2.out",
      });

      gsap.to(ruleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 1,
        ease: "power2.out",
      });
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
            src={siteImages.venturesHero.src}
            alt={siteImages.venturesHero.alt}
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <p className={styles.breadcrumb}>Home / Our Ventures</p>
        <h1 className={styles.heading}>
          {headingWords.map((word) => (
            <span key={word} data-hero-word className={styles.word}>
              {word}
            </span>
          ))}
        </h1>
        <p ref={subheadingRef} className={styles.subheading}>
          Five ventures. Each built to lead.
        </p>
        <p ref={bodyRef} className={styles.body}>
          Each venture in our portfolio is independently positioned, distinctly led,
          and built with a singular focus on excellence in its market.
        </p>
      </div>
      <div ref={ruleRef} className={styles.rule} />
    </section>
  );
}
