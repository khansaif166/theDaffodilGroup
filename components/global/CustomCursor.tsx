"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./CustomCursor.module.css";

type CursorMode = "default" | "link" | "image";

function supportsCustomCursor() {
  return (
    typeof window !== "undefined" &&
    !("ontouchstart" in window) &&
    window.matchMedia("(pointer: fine)").matches
  );
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number>();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    if (!supportsCustomCursor()) {
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

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };

    const updateMode = (nextMode: CursorMode) => {
      setMode((current) => (current === nextMode ? current : nextMode));
      document.body.dataset.cursorMode = nextMode;
    };

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
      setVisible(true);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) {
        updateMode("default");
        return;
      }

      if (target.closest("[data-cursor='image']")) {
        updateMode("image");
        return;
      }

      if (target.closest("a, button, [data-cursor='link']")) {
        updateMode("link");
        return;
      }

      updateMode("default");
    };

    const onLeaveViewport = () => {
      setVisible(false);
      updateMode("default");
    };

    const render = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.12;
      ringPos.y += (mouse.y - ringPos.y) * 0.12;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      frameRef.current = window.requestAnimationFrame(render);
    };

    frameRef.current = window.requestAnimationFrame(render);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveViewport, { passive: true });

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveViewport);
      document.body.dataset.customCursor = "false";
      document.body.dataset.cursorMode = "default";
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className={styles.root} aria-hidden="true">
      <div
        ref={ringRef}
        className={`${styles.ring} ${mode === "link" ? styles.ringLink : ""} ${
          mode === "image" ? styles.ringImage : ""
        }`}
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span className={`${styles.viewText} ${mode === "image" ? styles.viewTextVisible : ""}`}>
          View
        </span>
      </div>
      <div
        ref={dotRef}
        className={`${styles.dot} ${mode === "link" ? styles.dotHidden : ""} ${
          mode === "image" ? styles.dotImage : ""
        }`}
        style={{ opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
