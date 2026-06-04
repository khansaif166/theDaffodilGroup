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
            <path
              className={styles.mapFill}
              d="M70 178c33-28 76-44 119-46 18 0 32-12 48-16 39-10 88 2 114 29 12 13 31 14 48 12 18-2 29-19 46-24 29-9 64 0 84 22 14 15 33 24 53 31 31 10 57 33 69 63-47 16-100 15-149 7-53-8-103-11-157 4-44 12-92 13-137 4-37-8-74-27-97-57-18-22-26-49-41-72Z"
            />
            <path
              className={styles.mapBorder}
              d="M70 178c33-28 76-44 119-46 18 0 32-12 48-16 39-10 88 2 114 29 12 13 31 14 48 12 18-2 29-19 46-24 29-9 64 0 84 22 14 15 33 24 53 31 31 10 57 33 69 63-47 16-100 15-149 7-53-8-103-11-157 4-44 12-92 13-137 4-37-8-74-27-97-57-18-22-26-49-41-72Z"
            />
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
