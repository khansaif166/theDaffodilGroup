"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useState } from "react";

import styles from "./ContactPage.module.css";

type FormState = {
  name: string;
  company: string;
  country: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  country: "",
  message: "",
};

export function ContactPage() {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      return;
    }

    setIsSubmitted(true);
    setForm(initialState);
  };

  return (
    <main className={styles.page}>
      <section className={styles.leftPane}>
        <span className={styles.eyebrow}>Contact</span>
        <h1 className={styles.heading}>Start a Conversation</h1>
        <p className={styles.subcopy}>
          Whether you are exploring partnerships, ventures, or strategic
          opportunities, we welcome considered introductions.
        </p>

        <div className={styles.detailsGrid}>
          <div className={styles.detailBlock}>
            <h2>Email</h2>
            <a href="mailto:hello@daffodilgroup.com">hello@daffodilgroup.com</a>
          </div>

          <div className={styles.detailBlock}>
            <h2>Offices</h2>
            <p>Dubai</p>
            <p>Mumbai</p>
            <p>Riyadh</p>
            <p>Accra</p>
          </div>

          <div className={styles.detailBlock}>
            <h2>Social</h2>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.rightPane}>
        <div className={styles.formShell}>
          <h2 className={styles.formTitle}>Tell us what you&apos;re building.</h2>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                className={styles.success}
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -12 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: "easeOut" }}
              >
                <h3 className={styles.successTitle}>Thank you. We&apos;ll be in touch.</h3>
                <p className={styles.successText}>
                  Your message has been received and forwarded to the team.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -12 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: "easeOut" }}
              >
                <label className={styles.field}>
                  <span className={styles.label}>Name</span>
                  <input
                    className={styles.input}
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Company</span>
                  <input
                    className={styles.input}
                    value={form.company}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, company: event.target.value }))
                    }
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Country</span>
                  <select
                    className={styles.select}
                    value={form.country}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, country: event.target.value }))
                    }
                    required
                  >
                    <option value="">Select a country</option>
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Message</span>
                  <textarea
                    className={styles.textarea}
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, message: event.target.value }))
                    }
                    required
                  />
                </label>

                <button type="submit" className={styles.button} disabled={isSubmitting}>
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
