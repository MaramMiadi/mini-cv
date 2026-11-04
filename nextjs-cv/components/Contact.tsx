"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";

type ApiResponse = {
  message?: string;
  error?: {
    message?: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
};

export default function Contact() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        const validationMessage = result.error?.details
          ?.map((detail) => detail.message)
          .join(" ");

        setStatus(
          validationMessage ||
            result.error?.message ||
            "Impossible d'envoyer le message."
        );
        return;
      }

      setStatus(
       result.message || "Votre message a été enregistré avec succès."
);
      form.reset();
    } catch {
      setStatus("Impossible de joindre le service. Réessayez plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="container contact">
        <div>
          <h2>Contact</h2>
          <p>Une question, une opportunité ? Écrivez-moi.</p>

          <ul className="contact-links">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">Nom</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            minLength={2}
            maxLength={80}
            autoComplete="name"
            required
          />

          <label htmlFor="contact-email">Adresse e-mail</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            maxLength={254}
            autoComplete="email"
            required
          />

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            minLength={10}
            maxLength={3000}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </button>

          {status && (
            <p role="status" aria-live="polite">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
