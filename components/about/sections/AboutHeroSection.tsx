"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { PlaceholderImage } from "@/components";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const headingLines = [["We", "Are", "The"], ["Daffodil", "Group."]];

export function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const subcopyRef = useRef<HTMLParagraphElement | null>(null);
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
        gsap.set([imageRef.current, words, subcopyRef.current, ruleRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
        return;
      }

      gsap.set(words, { opacity: 0, y: 34 });
      gsap.set([subcopyRef.current, ruleRef.current], { opacity: 0, y: 20 });
      gsap.set(imageRef.current, { scale: 1.06 });

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

      gsap.to([subcopyRef.current, ruleRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 1,
        ease: "power2.out",
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.pageHero}>
      <div className={styles.heroMedia}>
        <div ref={imageRef} className={styles.heroImage}>
          <PlaceholderImage
            label="Aerial city skyline at golden hour with warm tones and a wide cinematic Dubai or Mumbai aesthetic."
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className={styles.heroContent}>
        <div className="container">
          <div className={styles.heroOverlay}>
            <p className={styles.breadcrumb}>Home / About</p>
            <h1 className={styles.heroHeading}>
              {headingLines.map((line, lineIndex) => (
                <span key={`line-${lineIndex}`} className={styles.heroLine}>
                  {line.map((word) => (
                    <span
                      key={word}
                      data-hero-word
                      className={`${styles.heroWord} ${lineIndex === 1 ? styles.heroItalic : ""}`}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p ref={subcopyRef} className={styles.heroSubcopy}>
              A holding group built on discipline, vision, and a relentless belief in
              the businesses we build.
            </p>
            <div ref={ruleRef} className={styles.heroRule} />
          </div>
        </div>
      </div>
    </section>
  );
}
