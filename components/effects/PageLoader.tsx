"use client";

import { useEffect, useState } from "react";

import styles from "./PageLoader.module.css";

const STORAGE_KEY = "daffodil-loader-seen";

export function PageLoader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState("0%");
  const [opacity, setOpacity] = useState("1");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeen = window.localStorage.getItem(STORAGE_KEY) === "true";

    if (prefersReducedMotion || hasSeen) {
      return;
    }

    setVisible(true);
    window.localStorage.setItem(STORAGE_KEY, "true");

    const frame = window.requestAnimationFrame(() => {
      setProgress("100%");
    });

    const fadeTimeout = window.setTimeout(() => {
      setOpacity("0");
    }, 620);

    const hideTimeout = window.setTimeout(() => {
      setVisible(false);
    }, 900);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fadeTimeout);
      window.clearTimeout(hideTimeout);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={styles.bar}
      aria-hidden="true"
      style={
        {
          "--loader-progress": progress,
          "--loader-opacity": opacity,
        } as React.CSSProperties
      }
    />
  );
}
