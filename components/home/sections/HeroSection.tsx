"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import styles from "./HeroSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const headlineRows = [
  ["Building", "Transformative"],
  ["Ventures", "Globally."],
];

const microStats = ["4 Countries", "7 Sectors", "Est. 2020"];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imagePanelRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const secondaryArrowRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-hero-word]", section);

      if (prefersReducedMotion) {
        gsap.set(
          [
            labelRef.current,
            copyRef.current,
            actionsRef.current,
            dividerRef.current,
            cardRef.current,
            imagePanelRef.current,
            words,
          ],
          {
            clearProps: "all",
            opacity: 1,
            y: 0,
            scaleY: 1,
          },
        );
        gsap.set(imagePanelRef.current, { clipPath: "inset(0 0 0 0)" });
        return;
      }

      gsap.set(words, { opacity: 0, y: 40 });
      gsap.set(copyRef.current, { opacity: 0, y: 20 });
      gsap.set(actionsRef.current, { opacity: 0, y: 15 });
      gsap.set(labelRef.current, { opacity: 0, y: 10 });
      gsap.set(cardRef.current, { opacity: 0, y: 20 });
      gsap.set(dividerRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(imagePanelRef.current, { clipPath: "inset(0 100% 0 0)" });

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 })
        .to(
          imagePanelRef.current,
          {
            clipPath: "inset(0 0 0 0)",
            duration: 1,
            ease: "power3.inOut",
          },
          0.2,
        )
        .to(
          words,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.07,
          },
          0.3,
        )
        .to(
          dividerRef.current,
          {
            scaleY: 1,
            duration: 0.8,
          },
          0.8,
        )
        .to(copyRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.1)
        .to(cardRef.current, { opacity: 1, y: 0, duration: 0.55 }, 1.2);

      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.set(secondaryArrowRef.current, { x: 0 });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      <div className={styles.mediaBackdrop}>
        <div ref={imagePanelRef} className={styles.imagePanel}>
          <div ref={imageRef} className={styles.imageInner}>
            <video
              className={styles.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/hayat-living-room-wide.jpg"
              aria-label="Luxury interior hero video"
            >
              <source src="/videos/home-hero.mp4" type="video/mp4" />
              Your browser does not support the hero video.
            </video>
          </div>
          <div ref={cardRef} className={styles.floatingCard}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={styles.globeIcon}
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M4 12h16" />
              <path d="M12 4a12 12 0 0 0 0 16" />
              <path d="M12 4a12 12 0 0 1 0 16" />
            </svg>
            <span>Presence across 4 continents</span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.copyColumn}>
          <div ref={labelRef} className={styles.labelRow}>
            <span className={styles.labelLine} />
            <span className={styles.label}>The Daffodil Group</span>
          </div>

          <h1 className={styles.headline}>
            {headlineRows.map((row, rowIndex) => (
              <span key={`row-${rowIndex}`} className={styles.headlineRow}>
                {row.map((word, wordIndex) => (
                  <span
                    key={`${word}-${wordIndex}`}
                    data-hero-word
                    className={`${styles.word} ${word === "Globally." ? styles.wordItalic : ""}`}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p ref={copyRef} className={styles.subcopy}>
            A multi-sector holding group nurturing independent ventures across design,
            technology, FMCG, and advisory services.
          </p>

          <div ref={actionsRef} className={styles.actions}>
            <Link href="/ventures/" className={styles.primaryCta}>
              Explore Our Ventures
            </Link>
            <Link href="/about/" className={styles.secondaryCta}>
              <span>Our Story</span>
              <motion.span
                ref={secondaryArrowRef}
                className={styles.secondaryArrow}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                →
              </motion.span>
            </Link>
          </div>

          <div className={styles.microStats} aria-label="Company overview statistics">
            {microStats.map((item) => (
              <span key={item} className={styles.microStat}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
