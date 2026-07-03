"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { home, testimonials } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const ROTATE_MS = 7000;

/** One voice at a time, oversized, with a real photo — auto-rotating, manually steerable. */
export default function TestimonialsGrid() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[index];

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="section tsp" aria-label="Testimonials">
      <div className="container">
        <Reveal kind="fade">
          <p className="eyebrow">{home.testimonialsIntro.eyebrow}</p>
        </Reveal>

        <Reveal kind="up" delay={0.1}>
          <div aria-live="polite">
            <span className="tsp-mark" aria-hidden="true">
              "
            </span>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{ margin: 0 }}
              >
                <p className="tsp-quote">{t.quote}</p>
                <footer className="tsp-meta">
                  <span className="tsp-photo">
                    <Image src={t.photo} alt={`Portrait of ${t.name}`} width={52} height={52} />
                  </span>
                  <strong>{t.name}</strong>
                  <span className="sep" aria-hidden="true" />
                  <span>{t.title}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="tsp-nav" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((item, i) => (
            <button
              key={i}
              className="tsp-dot"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}: ${item.name}, ${item.title}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <Reveal kind="fade" delay={0.2} style={{ marginTop: 32 }}>
          <Link href={home.testimonialsLink.href} className="link-line">
            {home.testimonialsLink.label} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
