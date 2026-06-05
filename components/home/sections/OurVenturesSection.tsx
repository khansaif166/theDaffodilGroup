"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { PlaceholderImage } from "@/components";
import { siteImages } from "@/data/siteImages";

import styles from "./OurVenturesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const ventures = [
  {
    name: "La' Daffodil Business Solutions",
    sector: "Business Advisory",
    description: "Strategic advisory and market expansion across international borders.",
    image: siteImages.homeVentures.business,
  },
  {
    name: "Hayat Home",
    sector: "Design & Interior Architecture",
    description:
      "A design-led interior and fit-out company for residential and commercial spaces.",
    image: siteImages.homeVentures.hayat,
  },
  {
    name: "Yellow Saffron Company",
    sector: "FMCG",
    description: "A premium FMCG brand crafted for the modern consumer.",
    image: siteImages.homeVentures.yellowSaffron,
  },
  {
    name: "Daffodil Stories",
    sector: "Technology & Digital",
    description: "A digital content and storytelling platform for the new age of media.",
    image: siteImages.homeVentures.daffodilStories,
  },
  {
    name: "The Reading Box",
    sector: "Education & EdTech",
    description: "An early learning concept nurturing curiosity in young minds.",
    image: siteImages.homeVentures.readingBox,
  },
];

export function OurVenturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-venture-card]", section);

      if (prefersReducedMotion) {
        gsap.set([introRef.current, cards], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(introRef.current, { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 40 });

      gsap.to(introRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          once: true,
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section id="ventures" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div ref={introRef} className={styles.intro}>
          <span className={styles.label}>Our Ventures</span>
          <h2 className={styles.heading}>Five ventures. Each built to lead.</h2>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {ventures.map((venture, index) => (
            <article
              key={venture.name}
              data-venture-card
              className={`${styles.card} ${index < 2 ? styles.cardLarge : styles.cardSmall}`}
            >
              <div className={styles.imageWrap}>
                <PlaceholderImage
                  src={venture.image.src}
                  alt={venture.image.alt}
                  sizes="(max-width: 768px) 84vw, (max-width: 1100px) 50vw, 33vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <span className={styles.tag}>{venture.sector}</span>
                <h3 className={styles.name}>{venture.name}</h3>
                <p className={styles.description}>{venture.description}</p>
                <Link href="/ventures" className={styles.link}>
                  Explore <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
