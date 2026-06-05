"use client";

import Lenis from "@studio-freight/lenis";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { ScrollTrigger, gsap } from "@/lib/gsap";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const allowSmoothScroll =
      typeof window !== "undefined" &&
      window.innerWidth >= 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!allowSmoothScroll) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
    } as ConstructorParameters<typeof Lenis>[0] & {
      direction: "vertical";
      smooth: true;
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const scrollToHashTarget = () => {
        const target = document.getElementById(hash.replace("#", ""));

        if (!target) {
          return false;
        }

        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, { immediate: true });
        } else {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        }

        return true;
      };

      if (scrollToHashTarget()) {
        return;
      }

      const frame = window.requestAnimationFrame(() => {
        scrollToHashTarget();
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: prefersReducedMotion ? 1 : 0, y: 0 }}
        transition={{
          opacity: { duration: prefersReducedMotion ? 0 : 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
          y: { duration: prefersReducedMotion ? 0 : 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
      >
        {!prefersReducedMotion ? (
          <motion.span
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "2px",
              background: "var(--color-gold)",
              zIndex: 9997,
              transformOrigin: "left center",
            }}
            initial={{ width: "0%", opacity: 1 }}
            animate={{ width: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        ) : null}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
