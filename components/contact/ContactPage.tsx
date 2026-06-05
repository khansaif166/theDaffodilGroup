"use client";

import { useSetNavbarTheme } from "@/hooks/useSetNavbarTheme";

import styles from "./ContactPage.module.css";
import { ContactForm } from "./ContactForm";
import { ContactLeftPanel } from "./ContactLeftPanel";

export function ContactPage() {
  useSetNavbarTheme("dark");

  return (
    <main className={styles.page}>
      <ContactLeftPanel />
      <ContactForm />
    </main>
  );
}
