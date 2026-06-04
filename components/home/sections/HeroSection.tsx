"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PlaceholderImage } from "@/components";

import styles from "../HomePage.module.css";

gsap.registerPlugin(ScrollTrigger);

const headline = "Building Transformative Ventures Across Global Markets.";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const words = useMemo(() => headline.split(" "), []);

  useEffect(() => {
    const title = headingRef.current;
    const image = imageRef.current;
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!title || !image || !section) {
      return;
    }

    const wordNodes = title.querySelectorAll("[data-word]");

    if (prefersReducedMotion) {
      gsap.set(wordNodes, { opacity: 1, y: 0 });
      gsap.set(image, { yPercent: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          wordNodes,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.06,
          },
        );

      gsap.to(image, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      <div className={`container ${styles.heroGrid}`}>
        <div>
          <span className={styles.heroLabel}>The Daffodil Group</span>
          <h1 ref={headingRef} className={styles.heroHeadline}>
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className={styles.heroWord} data-word>
                {word}
              </span>
            ))}
          </h1>
          <p className={styles.heroSubcopy}>
            A multi-sector holding group with ventures spanning design,
            technology, FMCG, and advisory.
          </p>
        </div>

        <div className={styles.heroImageWrap}>
          <div ref={imageRef} className={styles.heroImage}>
            <PlaceholderImage
              label="premium architectural interior, warm natural light, minimal luxury aesthetic"
              sizes="(max-width: 1100px) 100vw, 52vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
