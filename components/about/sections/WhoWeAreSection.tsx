"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { PlaceholderImage } from "@/components";
import { siteImages } from "@/data/siteImages";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

export function WhoWeAreSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([copyRef.current, imageRef.current], { opacity: 1, y: 0, x: 0 });
        gsap.set(imageRef.current, { clipPath: "inset(0 0 0 0)" });
        return;
      }

      gsap.set(copyRef.current, { opacity: 0, y: 20 });
      gsap.set(imageRef.current, { clipPath: "inset(0 0 0 100%)" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      timeline.to(copyRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      timeline.to(
        imageRef.current,
        {
          clipPath: "inset(0 0 0 0)",
          duration: 1,
          ease: "power3.inOut",
        },
        0.3,
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} ${styles.sectionWhite}`}>
      <div className={`container ${styles.whoGrid}`}>
        <div ref={copyRef} className={styles.whoCopy}>
          <span className={styles.sectionLabel}>The Daffodil Group</span>
          <h2 className={styles.sectionHeading}>A diversified operating company built for enduring value.</h2>
          <div className={styles.whoNarrative}>
            <p className={styles.whoLead}>
              Established with an entrepreneurial vision and a commitment to
              excellence and guided by resilience, innovation, and a relentless
              pursuit of excellence, we have built a portfolio that reflects our
              commitment to creating sustainable businesses that stand the test of
              time.
            </p>
            <p>
              The Daffodil Group has evolved into a dynamic ecosystem of
              businesses spanning sectors. With a growing presence across Saudi
              Arabia, the United Arab Emirates, India, and emerging international
              markets, we combine global perspectives with local expertise to
              create innovative solutions, unlock opportunities, and drive
              long-term growth. Over the years, our journey has been defined by
              strategic thinking, entrepreneurial leadership, and the ability to
              identify opportunities in evolving markets.
            </p>
            <p>
              Today, The Daffodil Group continues to expand its footprint
              through strategic partnerships, innovative ventures, that create
              value across industries.
            </p>
            <p>
              At our core, we believe that businesses are powerful vehicles for
              transformation. We strive to build enterprises that empower
              people, strengthen industries, contribute to economic
              development, and create lasting value for future generations.
            </p>
          </div>
        </div>

        <div className={styles.whoImageFrame}>
          <div ref={imageRef} className={styles.whoImageInner}>
            <PlaceholderImage
              src={siteImages.aboutWhoWeAre.src}
              alt={siteImages.aboutWhoWeAre.alt}
              sizes="(max-width: 1100px) 100vw, 40vw"
              objectPosition="60% center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
