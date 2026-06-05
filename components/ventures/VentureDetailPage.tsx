"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button, PlaceholderImage } from "@/components";
import { useScrollReveal } from "@/lib";
import { ventures, type VentureRecord } from "@/data/ventures";
import { useSetNavbarTheme } from "@/hooks/useSetNavbarTheme";

import styles from "./VenturesPage.module.css";

gsap.registerPlugin(ScrollTrigger);

type VentureDetailPageProps = {
  venture: VentureRecord;
};

export function VentureDetailPage({ venture }: VentureDetailPageProps) {
  useSetNavbarTheme("dark");
  const imageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useScrollReveal<HTMLElement>("fadeIn");
  const bodyRef = useScrollReveal<HTMLDivElement>("fadeUp");
  const related = useMemo(
    () => ventures.filter((item) => item.slug !== venture.slug).slice(0, 3),
    [venture.slug],
  );

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hero || !image) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(image, { yPercent: 0 });
      return;
    }

    const tween = gsap.to(image, {
      yPercent: 16,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className={styles.detailHero} data-reveal="fadeIn">
        <div className="container">
          <div className={styles.detailIntro}>
            <span className={styles.sectorPill}>{venture.sector}</span>
            <h1 className={styles.detailTitle}>{venture.name}</h1>
          </div>

          <div className={styles.detailImageFrame}>
            <div ref={imageRef} className={styles.detailImage}>
              <PlaceholderImage
                src={venture.image}
                alt={venture.imageAlt}
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pageSection}>
        <div ref={bodyRef} className={`container ${styles.detailBodyGrid}`} data-reveal="fadeUp">
          <div className={styles.detailContent}>
            <h2>About This Venture</h2>
            <p className={styles.detailParagraph}>{venture.about[0]}</p>
            <p className={styles.detailParagraph}>{venture.about[1]}</p>

            <h2>Services & Offerings</h2>
            <div className={styles.offeringsGrid}>
              {venture.offerings.map((offering) => (
                <div key={offering} className={styles.offeringItem}>
                  {offering}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Button href={venture.website}>Visit Website</Button>
            </div>
          </div>

          <aside className={styles.detailSidebar}>
            <p className={styles.metaLabel}>Sector</p>
            <p className={styles.metaValue}>{venture.sector}</p>
            <p className={styles.metaLabel}>Geography</p>
            <p className={styles.metaValue}>{venture.geography}</p>
            <p className={styles.metaLabel}>Year Founded</p>
            <p className={styles.metaValue}>{venture.yearFounded}</p>
          </aside>
        </div>
      </section>

      <section className={styles.pageSection}>
        <div className="container">
          <h2 className={styles.relatedTitle}>Related Ventures</h2>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link key={item.slug} href={`/ventures/${item.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImage}>
                  <PlaceholderImage
                    src={item.image}
                    alt={item.imageAlt}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.relatedContent}>
                  <h3 className={styles.relatedName}>{item.name}</h3>
                  <p className={styles.relatedText}>{item.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
