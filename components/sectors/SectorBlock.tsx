"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useRef } from "react";

import { PlaceholderImage } from "@/components";
import type { SectorRecord } from "@/data/sectors";
import { ventures } from "@/data/ventures";
import { gsap } from "@/lib/gsap";

import styles from "./SectorBlock.module.css";

type SectorBlockProps = {
  sector: SectorRecord;
};

export function SectorBlock({ sector }: SectorBlockProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const ruleRef = useRef<HTMLSpanElement | null>(null);
  const imageFrameRef = useRef<HTMLDivElement | null>(null);
  const imageInnerRef = useRef<HTMLDivElement | null>(null);
  const pillsRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  const ventureLinks = useMemo(
    () =>
      sector.ventures
        .map((slug) => ventures.find((venture) => venture.slug === slug))
        .filter((venture): venture is NonNullable<(typeof ventures)[number]> => Boolean(venture)),
    [sector.ventures],
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const contentX = sector.contentSide === "left" ? -40 : 40;
    const imageFrom =
      sector.contentSide === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

    const context = gsap.context(() => {
      const pills = pillsRef.current ? Array.from(pillsRef.current.children) : [];
      const stats = statsRef.current ? Array.from(statsRef.current.children) : [];

      if (prefersReducedMotion) {
        gsap.set(
          [contentRef.current, ruleRef.current, imageFrameRef.current, pills, stats],
          { opacity: 1, x: 0, y: 0, width: 32, clearProps: "all" },
        );
        gsap.set(imageFrameRef.current, { clipPath: "inset(0 0 0 0)" });
        return;
      }

      gsap.set(contentRef.current, { opacity: 0, x: contentX });
      gsap.set(ruleRef.current, { width: 0 });
      gsap.set(imageFrameRef.current, { clipPath: imageFrom });
      gsap.set(pills, { opacity: 0, x: -10 });
      gsap.set(stats, { opacity: 0, y: 10 });

      gsap.to(contentRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      gsap.to(imageFrameRef.current, {
        clipPath: "inset(0 0 0 0)",
        duration: 1,
        delay: 0.15,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      gsap.to(ruleRef.current, {
        width: 32,
        duration: 0.4,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      if (pills.length > 0) {
        gsap.to(pills, {
          opacity: 1,
          x: 0,
          duration: 0.45,
          stagger: 0.08,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      }

      if (stats.length > 0) {
        gsap.to(stats, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.1,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      }

      gsap.to(imageInnerRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, [sector.contentSide]);

  return (
    <section
      id={sector.id}
      ref={sectionRef}
      className={`${styles.section} ${sector.bgColor === "cream" ? styles.cream : styles.white}`}
    >
      <div
        className={`container ${styles.grid} ${
          sector.contentSide === "right" ? styles.reverse : ""
        }`}
      >
        <div ref={contentRef} className={styles.content}>
          <span className={styles.number}>{sector.number}</span>
          <span ref={ruleRef} className={styles.rule} aria-hidden="true" />
          <h2 className={styles.name}>{sector.name}</h2>
          <p className={styles.tagline}>{sector.tagline}</p>
          <div className={styles.copy}>
            <p>{sector.bodyPara1}</p>
            <p>{sector.bodyPara2}</p>
          </div>

          <div className={styles.ventures}>
            <span className={styles.venturesLabel}>Ventures</span>
            <div ref={pillsRef} className={styles.pills}>
              {ventureLinks.length > 0 ? (
                ventureLinks.map((venture) => (
                  <Link key={venture.slug} href={`/ventures/${venture.slug}/`} className={styles.pill}>
                    {venture.name}
                  </Link>
                ))
              ) : (
                <span className={`${styles.pill} ${styles.pillMuted}`}>Coming Soon</span>
              )}
            </div>
          </div>

          <div ref={statsRef} className={styles.stats}>
            {sector.stats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={imageFrameRef} className={styles.media}>
          <div ref={imageInnerRef} className={styles.mediaInner}>
            <PlaceholderImage
              src={sector.image}
              alt={sector.imageAlt}
              sizes="(max-width: 980px) 100vw, 45vw"
              objectPosition="center center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
