"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { PlaceholderImage } from "@/components";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Established", value: "2020" },
  { label: "Registered in", value: "India · UAE · Saudi Arabia" },
  { label: "Portfolio spans", value: "7 industries" },
];

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
      const rows = gsap.utils.toArray<HTMLElement>("[data-stat-row]", section);

      if (prefersReducedMotion) {
        gsap.set([copyRef.current, imageRef.current, rows], { opacity: 1, y: 0, x: 0 });
        gsap.set(imageRef.current, { clipPath: "inset(0 0 0 0)" });
        return;
      }

      gsap.set(copyRef.current, { opacity: 0, y: 20 });
      gsap.set(imageRef.current, { clipPath: "inset(0 0 0 100%)" });
      gsap.set(rows, { opacity: 0, x: -10 });

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

      timeline.to(
        rows,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.6,
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
          <span className={styles.sectionLabel}>About The Group</span>
          <div className={styles.editorialText}>
            <p>
              The Daffodil Group is a company managing a diversified portfolio of
              multi-sector ventures, built to deliver scalable growth, strategic
              expansion, and long-term value across international markets.
            </p>
            <p>
              At its core, the group operates as a strategic platform — owning,
              nurturing, and scaling businesses through a{" "}
              <span className={styles.underlineAccent}>
                disciplined approach to capital allocation
              </span>
              , governance, and execution.
            </p>
          </div>

          <div className={styles.statsList}>
            {stats.map((stat) => (
              <div key={stat.label} data-stat-row className={styles.statRow}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.whoImageFrame}>
          <div ref={imageRef} className={styles.whoImageInner}>
            <PlaceholderImage
              label="Close-up editorial image of hands reviewing documents in a warm desaturated tone."
              sizes="(max-width: 1100px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
