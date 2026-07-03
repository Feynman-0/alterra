"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { contact, site } from "@/lib/content";

/**
 * The discovery-meeting scheduler. Requested times arrive as enquiries for
 * manual confirmation — no third-party embed required. Swap in Calendly by
 * setting contact.scheduler.calendlyUrl in lib/content.ts.
 */

type Day = { iso: string; dow: string; num: string; mon: string; full: string };

const SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

function nextBusinessDays(count: number): Day[] {
  const days: Day[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (days.length < count) {
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) {
      days.push({
        iso: d.toISOString().slice(0, 10),
        dow: d.toLocaleDateString("en-US", { weekday: "short" }),
        num: String(d.getDate()),
        mon: d.toLocaleDateString("en-US", { month: "short" }),
        full: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export default function BookingScheduler() {
  const s = contact.scheduler;
  const [days, setDays] = useState<Day[]>([]);
  const [day, setDay] = useState<Day | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");

  useEffect(() => {
    const d = nextBusinessDays(12);
    setDays(d);
    setDay(d[0]);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!day || !slot) {
      setNote("Pick a day and a time first — then we'll take your details.");
      return;
    }
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (!String(data.name ?? "").trim() || !/^\S+@\S+\.\S+$/.test(String(data.email ?? ""))) {
      setNote("Your name and a valid email are all we need to confirm.");
      return;
    }
    setNote("");
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          date: day.iso,
          dateLabel: day.full,
          time: `${slot} PT`,
          ...data,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      trackEvent("booking_requested", { date: day.iso, time: slot });
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
        <h3>Request received.</h3>
        <p>
          {day?.full} · {slot} PT — we&rsquo;ll confirm your discovery meeting by email shortly.
        </p>
      </motion.div>
    );
  }

  if (s.calendlyUrl) {
    return (
      <a className="btn btn--solid" href={s.calendlyUrl} target="_blank" rel="noopener noreferrer">
        <span>{s.cta}</span>
      </a>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <p className="book-meta">{s.lede}</p>

      {/* step 1 — the day */}
      <div className="book-days" role="group" aria-label="Choose a day">
        {days.length === 0 && <span className="book-meta">Loading availability…</span>}
        {days.map((d) => (
          <button
            type="button"
            key={d.iso}
            className="book-day"
            aria-pressed={day?.iso === d.iso}
            onClick={() => {
              setDay(d);
              setSlot(null);
            }}
          >
            <span className="book-day-dow">{d.dow}</span>
            <span className="book-day-num">{d.num}</span>
            <span className="book-day-mon">{d.mon}</span>
          </button>
        ))}
      </div>

      {/* step 2 — the time */}
      <div className="book-slots" role="group" aria-label="Choose a time (Pacific)">
        {SLOTS.map((sl) => (
          <button
            type="button"
            key={sl}
            className="book-slot"
            aria-pressed={slot === sl}
            onClick={() => setSlot(sl)}
          >
            {sl}
          </button>
        ))}
      </div>

      {day && slot && (
        <motion.p
          className="book-summary"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {day.full} · {slot} Pacific
        </motion.p>
      )}

      {/* step 3 — who you are */}
      <div className="book-fields">
        <div className="field">
          <label htmlFor="bk-name">Name</label>
          <input id="bk-name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="bk-email">Work email</label>
          <input id="bk-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field field--full">
          <label htmlFor="bk-company">Company</label>
          <input id="bk-company" name="company" autoComplete="organization" />
        </div>
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
      />

      <div className="ct-form-actions" style={{ marginTop: 28 }}>
        <button type="submit" className="btn btn--solid" disabled={status === "sending"}>
          <span>{status === "sending" ? "Requesting…" : "Request this time"}</span>
        </button>
        {note && (
          <p className="form-note" role="alert">
            {note}
          </p>
        )}
        {status === "error" && (
          <p className="form-note" role="alert">
            {contact.form.error}{" "}
            <a className="link-line" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
