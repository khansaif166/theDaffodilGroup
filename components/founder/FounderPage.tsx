"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

import { PlaceholderImage } from "@/components";
import { useSetNavbarTheme } from "@/hooks/useSetNavbarTheme";

import styles from "./FounderPage.module.css";

export function FounderPage() {
  useSetNavbarTheme("dark");

  const heroRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const story = storyRef.current;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-founder-hero]", hero ?? undefined);
      const storyItems = gsap.utils.toArray<HTMLElement>("[data-founder-story]", story ?? undefined);

      gsap.set(heroItems, { opacity: 0, y: 26 });
      gsap.set(storyItems, { opacity: 0, y: 28 });

      gsap.to(heroItems, {
        opacity: 1,
        y: 0,
        duration: 0.72,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.to(storyItems, {
        opacity: 1,
        y: 0,
        duration: 0.72,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: story,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <main>
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroMedia}>
          <div className={styles.heroImage}>
            <PlaceholderImage
              src="/images/hayat-archway-console.jpg"
              alt="A refined interior vignette with an arched opening, sculptural decor, and warm natural light."
              sizes="100vw"
              priority
            />
          </div>
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p data-founder-hero className={styles.breadcrumb}>
              Home / Founder
            </p>
            <span data-founder-hero className={styles.label}>
              Founder | The Daffodil Group
            </span>
            <h1 data-founder-hero className={styles.name}>
              Santoshi Roopa
            </h1>
            <blockquote data-founder-hero className={styles.quote}>
              The future belongs to those who have the courage to see
              opportunities, to embrace possibility, and to pursue their vision
              with unwavering determination.
            </blockquote>
            <p data-founder-hero className={styles.quoteSupport}>
              Every journey begins with a dream, but it is perseverance,
              purpose, and conviction that brings it to life.
            </p>
          </div>
        </div>
      </section>

      <section ref={storyRef} className={styles.storySection}>
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.storyCopy}>
            <span data-founder-story className={styles.sectionLabel}>
              A Journey Built on Purpose
            </span>
            <h2 data-founder-story className={styles.heading}>
              Building possibilities through resilience, purpose, and vision.
            </h2>

            <div className={styles.copyStack}>
              <p data-founder-story className={styles.lead}>
                The Daffodil Group is the reflection of a journey shaped by dreams,
                determination, resilience, and an unwavering belief in creating
                something meaningful.
              </p>
              <p data-founder-story>
                My entrepreneurial path began with a simple aspiration. The journey
                was filled with challenges that tested my resolve, opportunities
                that pushed me beyond my comfort zone, and experiences that taught
                me some of life's most valuable lessons. Every step, whether a
                success or a setback, contributed to shaping the leader and
                entrepreneur I am today.
              </p>
              <p data-founder-story>
                What began as a single venture gradually evolved into a diverse
                portfolio of businesses across multiple sectors and geographies.
                Each company within The Daffodil Group represents a chapter of my
                journey, a reflection of the experiences, insights, and values that
                have guided me over the years. While the industries may differ,
                they are united for a common purpose.
              </p>
              <p data-founder-story>
                Building businesses across borders has given me the privilege of
                working with remarkable people, exploring new cultures, and gaining
                perspectives that continue to inspire my approach to leadership.
                These experiences have reinforced my belief that true success is
                not defined by what we achieve alone, but by the opportunities we
                create, the lives we touch.
              </p>
              <p data-founder-story>
                Today, The Daffodil Group stands as a testament to that belief. As
                we continue to grow and evolve, I remain committed to building
                businesses that empower people, foster meaningful partnerships, and
                create a lasting impact for future generations.
              </p>
              <p data-founder-story>
                For me, this journey has never been solely about building
                companies. It has always been about building possibilities,
                creating opportunities, and leaving the world a little better than
                I found it.
              </p>
            </div>
          </div>

          <div data-founder-story className={styles.visualPanel}>
            <div className={styles.visualImage}>
              <PlaceholderImage
                src="/images/hayat-bedroom-suite.jpg"
                alt="A calm bedroom suite with layered textures, warm neutrals, and editorial lighting."
                sizes="(max-width: 1100px) 100vw, 38vw"
                objectPosition="58% center"
              />
            </div>

            <div className={styles.founderNote}>
              <span className={styles.noteLabel}>Founder Note</span>
              <p className={styles.noteText}>
                Purpose, perseverance, and conviction remain the constants behind
                every venture we build.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
