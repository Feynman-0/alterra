"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = (href: string) =>
    pathname === href ? ("page" as const) : undefined;

  return (
    <header className="nav" data-scrolled={scrolled || open}>
      <div className="container nav-inner">
        <Link href="/" className="nav-brand" aria-label="Alterra — home">
          ALTERR<em>A</em>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={current(l.href)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href={nav.cta.href} className="nav-cta">
          {nav.cta.label}
        </Link>

        <button
          className="nav-burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="nav-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <button
              type="button"
              className="nav-overlay-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <nav aria-label="Mobile">
              <ul>
                {[{ label: "Home", href: "/" }, ...nav.links].map((l, i) => (
                  <li key={l.href}>
                    <motion.span
                      style={{ display: "inline-block" }}
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "105%", transition: { duration: 0.3 } }}
                      transition={{ duration: 0.7, delay: 0.16 + i * 0.06, ease: EASE }}
                    >
                      <Link href={l.href} aria-current={current(l.href)}>
                        {l.label}
                      </Link>
                    </motion.span>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="nav-overlay-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span>{site.location}</span>
              <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
