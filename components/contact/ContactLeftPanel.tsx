"use client";

import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import styles from "./ContactLeftPanel.module.css";

const headingWords = ["Start", "a", "Conversation."];

const contactDetails = [
  { label: "Email", value: "hello@thedaffodilgroup.com", href: "mailto:hello@thedaffodilgroup.com" },
  { label: "Based In", value: "India · UAE · Saudi Arabia" },
  { label: "Working Hours", value: "Sun-Thu, 9am-6pm GST" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 11v5M8 8v.01M12 16v-3a2 2 0 1 1 4 0v3M4 6h16v12H4z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
        <path d="M16.5 7.5v.01" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://www.twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 5.8c-.7.3-1.5.5-2.3.6a4 4 0 0 0 1.8-2.2a8 8 0 0 1-2.5 1a4 4 0 0 0-6.8 3.6a11.4 11.4 0 0 1-8.3-4.2a4 4 0 0 0 1.2 5.3a4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9a4 4 0 0 1-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 3 18.6a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5A8 8 0 0 0 22 5.8" />
      </svg>
    ),
  },
];

export function ContactLeftPanel() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-contact-word]", section);
      const blocks = gsap.utils.toArray<HTMLElement>("[data-contact-block]", section);

      if (prefersReducedMotion) {
        gsap.set([words, blocks], { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      gsap.set(words, { opacity: 0, y: 30 });
      gsap.set(blocks, { opacity: 0, y: 15 });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.07,
        delay: 0.3,
        ease: "power2.out",
      });

      gsap.to(blocks, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.15,
        delay: 0.7,
        ease: "power2.out",
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.panel}>
      <div className={styles.inner}>
        <div className={styles.topBlock}>
          <p className={styles.label}>Get in Touch</p>
          <h1 className={styles.heading}>
            {headingWords.map((word) => (
              <span key={word} className={styles.word} data-contact-word>
                {word}
              </span>
            ))}
          </h1>
        </div>

        <p className={styles.subcopy} data-contact-block>
          Whether you&apos;re looking to explore a partnership, enter a new market, or
          simply learn more about our group - we&apos;d love to hear from you.
        </p>

        <div className={styles.rule} data-contact-block />

        <div className={styles.details} data-contact-block>
          {contactDetails.map((detail) => (
            <div key={detail.label} className={styles.detailItem}>
              <span className={styles.dot} />
              <div className={styles.detailCopy}>
                <p className={styles.detailLabel}>{detail.label}</p>
                {detail.href ? (
                  <a className={styles.detailValue} href={detail.href}>
                    {detail.value}
                  </a>
                ) : (
                  <p className={styles.detailValue}>{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.rule} data-contact-block />

        <div className={styles.socialBlock} data-contact-block>
          <p className={styles.detailLabel}>Follow Us</p>
          <div className={styles.socials}>
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className={styles.socialLink}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.footerMark}>© 2025 The Daffodil Group</p>
    </section>
  );
}
