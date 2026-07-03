"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { contact, site } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

function DrawnCheck() {
  return (
    <span className="ct-check" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <motion.path
          d="M4 11.5 9 16.5 18 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </span>
  );
}

export default function ContactForm() {
  const f = contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!String(data.name ?? "").trim() || !String(data.message ?? "").trim()) {
      setNote("Please add your name and a short message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(String(data.email ?? ""))) {
      setNote("That email doesn't look complete — mind checking it?");
      return;
    }

    setNote("");
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      trackEvent("enquiry_submitted", {});
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        className="ct-success"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        role="status"
      >
        <DrawnCheck />
        <h3>{f.success.title}</h3>
        <p>{f.success.body}</p>
      </motion.div>
    );
  }

  return (
    <form className="ct-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="cf-name">{f.fields.name}</label>
        <input id="cf-name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="cf-company">{f.fields.company}</label>
        <input id="cf-company" name="company" autoComplete="organization" required />
      </div>
      <div className="field field--full">
        <label htmlFor="cf-email">{f.fields.email}</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field field--full">
        <label htmlFor="cf-message">{f.fields.message}</label>
        <textarea id="cf-message" name="message" placeholder={f.fields.messagePlaceholder} rows={4} required />
      </div>

      {/* honeypot — humans never see it, bots can't resist it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
      />

      <div className="ct-form-actions">
        <button type="submit" className="btn btn--solid" disabled={status === "sending"}>
          <span>{status === "sending" ? "Sending…" : f.submit}</span>
        </button>
        <span className="small">{f.reassure}</span>
        {note && (
          <p className="form-note" role="alert">
            {note}
          </p>
        )}
        {status === "error" && (
          <p className="form-note" role="alert">
            {f.error}{" "}
            <a className="link-line" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
