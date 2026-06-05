"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useState } from "react";

import styles from "./ContactForm.module.css";

type FormState = {
  name: string;
  email: string;
  company: string;
  country: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  country: "",
  subject: "",
  message: "",
};

type FieldProps = {
  id: keyof FormState;
  label: string;
  focusedField: keyof FormState | null;
  setFocusedField: (field: keyof FormState | null) => void;
  children: React.ReactNode;
};

function Field({ id, label, focusedField, setFocusedField, children }: FieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.inputWrap}>
        {children}
        <motion.span
          className={styles.focusDot}
          initial={false}
          animate={{
            opacity: focusedField === id ? 1 : 0,
            x: focusedField === id ? 0 : -10,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>
    </label>
  );
}

export function ContactForm() {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<keyof FormState | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Unable to send your message right now.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
      setForm(initialState);
    } catch {
      setError("Unable to send your message right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError("");
    setForm(initialState);
  };

  return (
    <section className={styles.panel}>
      <div className={styles.inner}>
        <p className={styles.label}>Send a Message</p>
        <p className={styles.intro}>Tell us about your project or enquiry.</p>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              className={styles.success}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -20 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
            >
              <h2 className={styles.successHeading}>Thank you.</h2>
              <p className={styles.successBody}>
                We&apos;ve received your message and will be in touch within 1-2
                business days.
              </p>
              <button type="button" onClick={resetForm} className={styles.resetLink}>
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -20 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
            >
              <Field
                id="name"
                label="Full Name"
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              >
                <input
                  className={styles.input}
                  type="text"
                  value={form.name}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Your full name"
                  required
                />
              </Field>

              <Field
                id="email"
                label="Email Address"
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              >
                <input
                  className={styles.input}
                  type="email"
                  value={form.email}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="Your email address"
                  required
                />
              </Field>

              <Field
                id="company"
                label="Company / Organisation"
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              >
                <input
                  className={styles.input}
                  type="text"
                  value={form.company}
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, company: event.target.value }))
                  }
                  placeholder="Company name"
                />
              </Field>

              <Field
                id="country"
                label="Country"
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              >
                <div className={styles.selectWrap}>
                  <select
                    className={styles.select}
                    value={form.country}
                    onFocus={() => setFocusedField("country")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, country: event.target.value }))
                    }
                    required
                  >
                    <option value="">Select a country</option>
                    <option value="India">India</option>
                    <option value="UAE">UAE</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="West Africa">West Africa</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className={styles.chevron} aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </Field>

              <Field
                id="subject"
                label="Subject"
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              >
                <div className={styles.selectWrap}>
                  <select
                    className={styles.select}
                    value={form.subject}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, subject: event.target.value }))
                    }
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Partnership Enquiry">Partnership Enquiry</option>
                    <option value="Market Entry Advisory">Market Entry Advisory</option>
                    <option value="Investment / Ventures">Investment / Ventures</option>
                    <option value="Media &amp; Press">Media &amp; Press</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className={styles.chevron} aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </Field>

              <Field
                id="message"
                label="Message"
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              >
                <textarea
                  className={styles.textarea}
                  rows={4}
                  value={form.message}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, message: event.target.value }))
                  }
                  placeholder="Tell us about your project..."
                  required
                />
              </Field>

              <button type="submit" className={styles.button} disabled={isSubmitting}>
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>

              <AnimatePresence>
                {error ? (
                  <motion.p
                    key="error"
                    className={styles.error}
                    initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -10 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
                  >
                    {error}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
