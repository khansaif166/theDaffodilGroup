"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "./GlobalPresenceSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { country: "India", region: "South Asia", x: 560, y: 218 },
  { country: "UAE", region: "Gulf", x: 485, y: 180 },
  { country: "Saudi Arabia", region: "Middle East", x: 515, y: 170 },
  { country: "West Africa", region: "Nigeria Hub", x: 362, y: 202 },
];

const continentPaths = [
  "M96 146c14-16 35-29 59-31 18-2 34 4 47 16 10 10 12 23 16 36 4 12 15 19 25 25 11 6 17 16 18 29-15 4-29 1-41-7-13-9-25-21-39-22-14-2-26 7-40 7-18 0-36-11-47-27-10-14-10-27 2-40Z",
  "M262 120c10-10 25-16 40-14 10 2 18 8 26 14 7 5 17 7 24 12 9 6 15 16 17 27-13 4-27 5-39 11-10 5-16 15-25 22-9 6-22 8-31 1-9-7-10-20-10-31 0-14-5-31-2-42Z",
  "M336 164c8-9 19-15 31-14 14 1 24 11 34 20 10 9 21 17 34 20 12 3 25 2 36 7 13 6 24 18 25 33-18 7-39 5-58 7-12 2-24 8-36 8-13 0-24-7-36-7-18-1-35 10-53 8-16-1-34-13-37-29-3-15 11-26 23-34 13-8 28-9 37-19Z",
  "M448 124c6-8 16-14 26-14 14 0 26 8 35 18 5 6 10 13 17 17 10 6 23 6 31 15 7 8 9 21 3 30-8 10-23 11-35 14-11 3-19 11-28 18-8 7-17 16-28 15-13-1-21-14-24-27-3-13-6-26-4-40 2-17-2-35 7-46Z",
  "M529 154c7-6 16-9 25-8 11 1 21 8 28 16 8 9 14 20 23 27 10 8 25 11 31 22 6 10 2 23-7 30-9 7-22 10-33 13-11 4-19 14-30 16-12 3-24-4-31-14-7-10-10-22-14-34-3-11-11-21-11-32 0-15 9-28 19-36Z",
];

export function GlobalPresenceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const listItems = gsap.utils.toArray<HTMLElement>("[data-country-item]", section);
      const rings = gsap.utils.toArray<SVGCircleElement>("[data-ring]", section);

      if (prefersReducedMotion) {
        gsap.set([copyRef.current, mapRef.current, listItems], { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(copyRef.current, { opacity: 0, x: -30 });
      gsap.set(mapRef.current, { opacity: 0 });
      gsap.set(listItems, { opacity: 0, x: -15 });

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
        mapRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        0.3,
      );

      timeline.to(
        listItems,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.5,
      );

      rings.forEach((ring, index) => {
        gsap.fromTo(
          ring,
          { scale: 1, opacity: 1, transformOrigin: "center center" },
          {
            scale: 2.5,
            opacity: 0,
            duration: 2,
            repeat: -1,
            delay: 1 + index * 0.18,
            ease: "power2.out",
          },
        );
      });

      const secondaryRings = gsap.utils.toArray<SVGCircleElement>("[data-ring-secondary]", section);

      secondaryRings.forEach((ring, index) => {
        gsap.fromTo(
          ring,
          { scale: 1, opacity: 1, transformOrigin: "center center" },
          {
            scale: 2.5,
            opacity: 0,
            duration: 2,
            repeat: -1,
            delay: 1.7 + index * 0.18,
            ease: "power2.out",
          },
        );
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section id="presence" ref={sectionRef} className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div ref={copyRef} className={styles.copy}>
          <span className={styles.label}>Where We Operate</span>
          <h2 className={styles.heading}>Built for borders. Designed to scale.</h2>
          <p className={styles.body}>
            From South Asia to the Gulf, West Africa to the Subcontinent, we operate
            where growth happens.
          </p>

          <ul ref={listRef} className={styles.countryList}>
            {locations.map((location) => (
              <li key={location.country} data-country-item className={styles.countryItem}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.countryName}>{location.country}</span>
                <span className={styles.region}>{location.region}</span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={mapRef} className={styles.mapWrap}>
          <svg
            viewBox="0 0 760 420"
            className={styles.map}
            role="img"
            aria-label="Simplified world map showing India, UAE, Saudi Arabia, and West Africa"
          >
            {continentPaths.map((path) => (
              <g key={path}>
                <path className={styles.mapFill} d={path} />
                <path className={styles.mapBorder} d={path} />
              </g>
            ))}
            {locations.map((location) => (
              <g key={location.country}>
                <circle className={styles.ring} data-ring cx={location.x} cy={location.y} r="9" />
                <circle
                  className={styles.ring}
                  data-ring-secondary
                  cx={location.x}
                  cy={location.y}
                  r="9"
                />
                <circle className={styles.innerDot} cx={location.x} cy={location.y} r="3" />
                <text className={styles.mapLabel} x={location.x + 14} y={location.y - 4}>
                  {location.country}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
