import Link from "next/link";

import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/ventures", label: "Ventures" },
  { href: "/sectors", label: "Sectors" },
  { href: "/#presence", label: "Presence" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://www.instagram.com", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.rule} />
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logo}>
              The Daffodil Group
            </Link>
            <p>
              Premium holdings platform shaping long-horizon growth across
              emerging regional economies.
            </p>
          </div>

          <div>
            <p className={styles.heading}>Quick Links</p>
            <nav className={styles.linkList} aria-label="Footer quick links">
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className={styles.heading}>Contact</p>
            <div className={styles.contactBlock}>
              <a href="mailto:hello@daffodilgroup.com">hello@daffodilgroup.com</a>
              <span>India | UAE | Saudi Arabia | West Africa</span>
            </div>
            <div className={styles.socials}>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
