"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./CursorEffect.module.css";

function canUseCustomCursor() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CursorEffect() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number>();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!canUseCustomCursor()) {
      document.body.dataset.customCursor = "false";
      return;
    }

    setEnabled(true);
    document.body.dataset.customCursor = "true";

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) {
      return;
    }

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: target.x, y: target.y };
    const dotPos = { x: target.x, y: target.y };

    const updateHover = (value: boolean) => {
      document.body.dataset.cursorHover = value ? "true" : "false";
    };

    const onMove = (event: MouseEvent) => {
      setVisible(true);
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const onLeave = () => {
      setVisible(false);
      updateHover(false);
    };

    const onEnter = () => {
      setVisible(true);
    };

    const onOver = (event: MouseEvent) => {
      const hoverTarget = event.target as HTMLElement | null;
      if (!hoverTarget) {
        return;
      }

      updateHover(Boolean(hoverTarget.closest("a, button, input, textarea, select")));
    };

    const render = () => {
      dotPos.x += (target.x - dotPos.x) * 0.32;
      dotPos.y += (target.y - dotPos.y) * 0.32;
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;

      dot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      frameRef.current = window.requestAnimationFrame(render);
    };

    frameRef.current = window.requestAnimationFrame(render);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseenter", onEnter, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.dataset.customCursor = "false";
      document.body.dataset.cursorHover = "false";
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className={styles.cursorRoot} aria-hidden="true">
      <div
        ref={ringRef}
        className={styles.ring}
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={dotRef}
        className={styles.dot}
        style={{ opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
