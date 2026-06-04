"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PlaceholderImage } from "@/components";

import styles from "../AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const title = "We Are The Daffodil Group.";

export function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const words = useMemo(() => title.split(" "), []);

  useEffect(() => {
    const section = sectionRef.current;
    const titleNode = headingRef.current;

    const image = imageRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!section || !titleNode || !image) {
      return;
    }

    const wordsNodes = titleNode.querySelectorAll("[data-word]");

    if (prefersReducedMotion) {
      gsap.set(wordsNodes, { opacity: 1, y: 0 });
      gsap.set(image, { yPercent: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          wordsNodes,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.06,
          },
        );

      gsap.to(image, {
        yPercent: 12,
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
    <section ref={sectionRef} className={styles.pageHero}>
      <div className={`container ${styles.heroGrid}`}>
        <div>
          <span className={styles.eyebrow}>About Us</span>
          <h1 ref={headingRef} className={styles.heroHeading}>
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className={styles.heroWord} data-word>
                {word}
              </span>
            ))}
          </h1>
        </div>

        <div className={styles.heroImageFrame}>
          <div ref={imageRef} className={styles.heroImage}>
            <PlaceholderImage
              label="boardroom or urban skyline, warm tone"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
