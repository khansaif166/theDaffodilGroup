"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { PlaceholderImage } from "@/components";
import { siteImages } from "@/data/siteImages";

import styles from "./PartnerCTASection.module.css";

gsap.registerPlugin(ScrollTrigger);

export function PartnerCTASection() {
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
        gsap.set([copyRef.current, imageRef.current], { opacity: 1, x: 0 });
        gsap.set(imageRef.current, { clipPath: "inset(0 0 0 0)" });
        return;
      }

      gsap.set(copyRef.current, { opacity: 0, x: -20 });
      gsap.set(imageRef.current, { clipPath: "inset(0 100% 0 0)" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      timeline.to(copyRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      timeline.to(
        imageRef.current,
        {
          clipPath: "inset(0 0 0 0)",
          duration: 0.9,
          ease: "power3.inOut",
        },
        0.2,
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div ref={copyRef} className={styles.copy}>
          <span className={styles.label}>Looking Ahead</span>
          <h2 className={styles.heading}>Looking Ahead</h2>
          <p className={styles.body}>
            At the Daffodil Group, we are committed to expanding our global
            footprint to build resilient businesses, foster meaningful
            partnerships, and create opportunities. We don&apos;t just build
            businesses; we build ecosystems that inspire growth and empower
            communities.
          </p>
          <div className={styles.actions}>
            <Link href="/contact/" className={styles.primaryCta}>
              Get in Touch
            </Link>
            <Link href="/ventures/" className={styles.secondaryCta}>
              <span>Explore Ventures</span>
              <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                →
              </motion.span>
            </Link>
          </div>
        </div>

        <div ref={imageRef} className={styles.imagePanel}>
          <PlaceholderImage
            src={siteImages.partnerCta.src}
            alt={siteImages.partnerCta.alt}
            sizes="(max-width: 980px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
