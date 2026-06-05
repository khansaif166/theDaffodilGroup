"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";

import styles from "./GlobalPresenceSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const mapImageSrc =
  "/images/world-map-presence.png";

const locations = [
  {
    country: "India",
    city: "Mumbai · Delhi",
    labelPlacement: "Right",
    left: "72.8%",
    top: "43.6%",
  },
  {
    country: "UAE",
    city: "Dubai",
    labelPlacement: "Above",
    left: "64.2%",
    top: "41.3%",
  },
  {
    country: "Saudi Arabia",
    city: "Riyadh",
    labelPlacement: "Left",
    left: "61.2%",
    top: "43.0%",
  },
  {
    country: "West Africa",
    city: "Nigeria",
    labelPlacement: "Right",
    left: "44.7%",
    top: "52.0%",
  },
];

export function GlobalPresenceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapFailed, setMapFailed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([copyRef.current, mapRef.current], { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(copyRef.current, { opacity: 0, x: -24 });
      gsap.set(mapRef.current, { opacity: 0, y: 20 });

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
        duration: 0.75,
        ease: "power2.out",
      });

      timeline.to(
        mapRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        0.18,
      );
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
          <h2 className={styles.heading}>
            <span className={styles.headingLine}>Built for borders.</span>
            <span className={`${styles.headingLine} ${styles.headingSoft}`}>Designed to scale.</span>
          </h2>
          <p className={styles.body}>
            From South Asia to the Gulf and West Africa, we operate where growth
            happens next.
          </p>

          <div className={styles.divider} aria-hidden="true" />

          <ul className={styles.countryList}>
            {locations.map((location) => (
              <li key={location.country} className={styles.countryItem}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.countryText}>
                  <span className={styles.countryName}>{location.country}</span>
                  <span className={styles.city}>{location.city}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={mapRef} className={styles.mapWrap}>
          {mapFailed ? (
            <div className={styles.mapFallback}>
              <span>World map unavailable</span>
            </div>
          ) : (
            <>
              <img
                src={mapImageSrc}
                alt="World map showing Daffodil Group presence"
                className={styles.mapImage}
                onError={() => setMapFailed(true)}
              />

              {locations.map((location) => (
                <div
                  key={location.country}
                  className={styles.marker}
                  style={{ left: location.left, top: location.top }}
                >
                  <div className={styles.markerDot} />
                  <div className={styles.markerRing1} />
                  <div className={styles.markerRing2} />
                  <span
                    className={`${styles.markerLabel} ${
                      styles[`markerLabel${location.labelPlacement}`]
                    }`}
                  >
                    {location.country}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
