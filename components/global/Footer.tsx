import Image from "next/image";
import Link from "next/link";

import { ventures } from "@/data/ventures";

import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/ventures", label: "Ventures" },
  { href: "/sectors", label: "Sectors" },
  { href: "/contact", label: "Contact" },
];

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

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/images/logo-footer-dark-transparent.png"
                alt="The Daffodil Group"
                width={300}
                height={128}
                className={styles.logoImage}
              />
            </Link>
            <div className={styles.brandRule} />
            <p className={styles.tagline}>Building ventures that outlast trends.</p>

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

          <div>
            <p className={styles.label}>Quick Links</p>
            <nav className={styles.linkList} aria-label="Footer quick links">
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.footerLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className={styles.label}>Get in Touch</p>
            <a href="mailto:hello@thedaffodilgroup.com" className={styles.emailLink}>
              hello@thedaffodilgroup.com
            </a>
            <p className={styles.offices}>Mumbai, India · Dubai, UAE · Riyadh, KSA · West Africa</p>

            <div className={styles.ventureLinks}>
              {ventures.map((venture) => (
                <a
                  key={venture.slug}
                  href={venture.website}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.ventureLink}
                >
                  {venture.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© 2025 The Daffodil Group. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
