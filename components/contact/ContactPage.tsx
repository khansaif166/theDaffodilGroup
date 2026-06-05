"use client";

import styles from "./ContactPage.module.css";
import { ContactForm } from "./ContactForm";
import { ContactLeftPanel } from "./ContactLeftPanel";

export function ContactPage() {
  return (
    <main className={styles.page} data-nav-theme="dark">
      <ContactLeftPanel />
      <ContactForm />
    </main>
  );
}
