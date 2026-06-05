"use client";

import { useLayoutEffect, useRef } from "react";

import type { SectorRecord } from "@/data/sectors";
import { gsap } from "@/lib/gsap";

import styles from "./SectorsIndexBar.module.css";

type SectorsIndexBarProps = {
  activeId: string;
  items: Pick<SectorRecord, "id" | "name">[];
};

export function SectorsIndexBar({ activeId, items }: SectorsIndexBarProps) {
  const barRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;

    if (!bar) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const navItems = gsap.utils.toArray<HTMLElement>("[data-sector-index-item]", bar);

      if (prefersReducedMotion) {
        gsap.set(navItems, { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      gsap.set(navItems, { opacity: 0, y: 10 });

      gsap.to(navItems, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          once: true,
        },
      });
    }, bar);

    return () => {
      context.revert();
    };
  }, []);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    const top = section.getBoundingClientRect().top + window.scrollY - 150;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={barRef} className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        {items.map((item, index) => (
          <div key={item.id} className={styles.itemWrap} data-sector-index-item>
            <button
              type="button"
              className={`${styles.item} ${activeId === item.id ? styles.active : ""}`}
              onClick={() => handleClick(item.id)}
            >
              {item.name}
            </button>
            {index < items.length - 1 ? <span className={styles.divider} aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
