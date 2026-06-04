"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/about", label: "About", id: "about" },
  { href: "/ventures", label: "Ventures", id: "ventures" },
  { href: "/sectors", label: "Sectors", id: "sectors" },
  { href: "/#presence", label: "Presence", id: "presence" },
  { href: "/contact", label: "Contact", id: "contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(pathname !== "/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80 || pathname !== "/");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = navLinks
      .filter((link) => link.href.startsWith("/#"))
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    document.body.dataset.menuOpen = isMenuOpen ? "true" : "false";

    return () => {
      document.body.dataset.menuOpen = "false";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.transparent}`}
      >
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo} aria-label="The Daffodil Group home">
            <span>The Daffodil Group</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            {navLinks.map((link) => {
              const isHashLink = link.href.startsWith("/#");
              const isActive = isHashLink
                ? pathname === "/" && activeSection === link.id
                : pathname === link.href;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-menu"
            className={styles.mobileOverlay}
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <motion.nav
              className={styles.mobileNav}
              aria-label="Mobile primary"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : 0.05,
                    delayChildren: prefersReducedMotion ? 0 : 0.06,
                  },
                },
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.id}
                  variants={{
                    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: prefersReducedMotion ? 0 : 0.32,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
