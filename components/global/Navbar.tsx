"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavbarTheme } from "@/context/NavbarThemeContext";
import { gsap } from "@/lib/gsap";

import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/about/", label: "About", id: "about" },
  { href: "/ventures/", label: "Ventures", id: "ventures" },
  { href: "/sectors/", label: "Sectors", id: "sectors" },
  { href: "/#presence", label: "Presence", id: "presence" },
];

const overlayLinks = [...navLinks, { href: "/contact/", label: "Contact", id: "contact" }];

function normalizePath(path: string) {
  if (path === "/") {
    return path;
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

const socials = [
  {
    href: "https://www.linkedin.com",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 11v5M8 8v.01M12 16v-3a2 2 0 1 1 4 0v3M4 6h16v12H4z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
        <path d="M16.5 7.5v.01" />
      </svg>
    ),
  },
  {
    href: "https://www.twitter.com",
    label: "Twitter",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 5.8c-.7.3-1.5.5-2.3.6a4 4 0 0 0 1.8-2.2a8 8 0 0 1-2.5 1a4 4 0 0 0-6.8 3.6a11.4 11.4 0 0 1-8.3-4.2a4 4 0 0 0 1.2 5.3a4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9a4 4 0 0 1-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 3 18.6a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5A8 8 0 0 0 22 5.8" />
      </svg>
    ),
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme } = useNavbarTheme();
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("presence");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const topLineRef = useRef<HTMLSpanElement | null>(null);
  const middleLineRef = useRef<HTMLSpanElement | null>(null);
  const bottomLineRef = useRef<HTMLSpanElement | null>(null);
  const normalizedPathname = normalizePath(pathname);
  const isContactPage = normalizedPathname === "/contact";
  const textColor = isScrolled
    ? "var(--color-charcoal)"
    : theme === "dark"
      ? "#FFFFFF"
      : "var(--color-charcoal)";
  const useDarkHeroLogo = !isScrolled && theme === "dark";
  const headerStyle = isScrolled
    ? undefined
    : isContactPage
      ? {
          background: "rgba(14,13,12,0.55)",
          backdropFilter: "blur(8px)",
          borderBottomColor: "rgba(255, 255, 255, 0.04)",
        }
      : undefined;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const section = document.getElementById("presence");

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current?.target.id) {
          setActiveSection(current.target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.4, 0.6] },
    );

    observer.observe(section);

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

  useLayoutEffect(() => {
    const topLine = topLineRef.current;
    const middleLine = middleLineRef.current;
    const bottomLine = bottomLineRef.current;

    if (!topLine || !middleLine || !bottomLine) {
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(topLine, { y: isMenuOpen ? 7 : 0, rotate: isMenuOpen ? 45 : 0 });
      gsap.set(middleLine, { opacity: isMenuOpen ? 0 : 1 });
      gsap.set(bottomLine, { y: isMenuOpen ? -7 : 0, rotate: isMenuOpen ? -45 : 0 });
      return;
    }

    const timeline = gsap.timeline({ defaults: { duration: 0.28, ease: "power2.out" } });
    timeline.to(topLine, { y: isMenuOpen ? 7 : 0, rotate: isMenuOpen ? 45 : 0 }, 0);
    timeline.to(middleLine, { opacity: isMenuOpen ? 0 : 1 }, 0);
    timeline.to(bottomLine, { y: isMenuOpen ? -7 : 0, rotate: isMenuOpen ? -45 : 0 }, 0);
  }, [isMenuOpen]);

  return (
    <>
      {/* 
        Page              Hero bg    useSetNavbarTheme
        /                  Cream      "light" (default)
        /about             Charcoal   "dark"
        /ventures          Cream      "light" (default)
        /ventures/[slug]   Dark img   "dark"
        /sectors           Cream      "light" (default)
        /contact           Split      "dark" + tinted glass
      */}
      <header
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.transparent}`}
        style={{ color: textColor, ...headerStyle }}
      >
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo} aria-label="The Daffodil Group home">
            <Image
              src={
                useDarkHeroLogo
                  ? "/images/logo-footer-dark-transparent.png"
                  : "/images/logo-navbar-horizontal-transparent.png"
              }
              alt="The Daffodil Group"
              width={240}
              height={102}
              className={styles.logoImage}
              priority
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            {navLinks.map((link) => {
              const isHashLink = link.href.startsWith("/#");
              const normalizedHref = isHashLink ? link.href : normalizePath(link.href);
              const isActive = isHashLink
                ? pathname === "/" && activeSection === link.id
                : normalizedPathname === normalizedHref;

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

          <div className={styles.actions}>
            <Link href="/contact/" className={styles.contactCta} data-cursor="link">
              Contact
            </Link>

            <button
              ref={buttonRef}
              type="button"
              className={styles.menuToggle}
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span ref={topLineRef} style={{ background: textColor }} />
              <span ref={middleLineRef} style={{ background: textColor }} />
              <span ref={bottomLineRef} style={{ background: textColor }} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-menu"
            className={styles.mobileOverlay}
            initial={{ clipPath: prefersReducedMotion ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: prefersReducedMotion ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.mobileShell}>
              <nav className={styles.mobileNav} aria-label="Mobile primary">
                {overlayLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.38,
                      delay: prefersReducedMotion ? 0 : index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link href={link.href} className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className={styles.mobileFooter}>
                <a href="mailto:hello@thedaffodilgroup.com" className={styles.mobileEmail}>
                  hello@thedaffodilgroup.com
                </a>
                <div className={styles.mobileSocials}>
                  {socials.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className={styles.mobileSocialLink}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
