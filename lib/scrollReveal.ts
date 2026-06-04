"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ScrollRevealVariant = "fadeUp" | "fadeIn" | "staggerChildren";

type ScrollRevealOptions = {
  delay?: number;
  distance?: number;
  stagger?: number;
};

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  variant: ScrollRevealVariant,
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T | null>(null);
  const { delay = 0, distance = 32, stagger = 0.08 } = options;

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

     const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1, y: 0 });
      gsap.set(Array.from(element.children), { opacity: 1, y: 0 });
      return;
    }

    const targets =
      variant === "staggerChildren" ? Array.from(element.children) : element;

    const animationConfig =
      variant === "fadeIn"
        ? { opacity: 0 }
        : { opacity: 0, y: distance };

    const tween = gsap.fromTo(
      targets,
      animationConfig,
      {
        opacity: 1,
        y: 0,
        duration: 0.72,
        ease: "power2.out",
        delay,
        stagger: variant === "staggerChildren" ? stagger : 0,
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, distance, stagger, variant]);

  return ref;
}
