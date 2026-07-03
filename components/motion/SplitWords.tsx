"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Headline treatment: every word rises out of its own overflow mask,
 * staggered — the site's signature entrance.
 * Words wrapped in *asterisks* render in the italic gold serif accent.
 */
export default function SplitWords({
  text,
  delay = 0,
  stagger = 0.07,
  className,
  inView = false,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  inView?: boolean; // true → animate on scroll into view, false → on mount
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const render = (word: string) =>
    word.startsWith("*") && word.endsWith("*") ? (
      <em className="serif-i">{word.slice(1, -1)}</em>
    ) : (
      word
    );

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span key={i}>{render(w)} </span>
        ))}
      </span>
    );
  }

  const anim = {
    initial: { y: "115%", rotate: 2.5 },
    animate: { y: "0%", rotate: 0 },
  };

  return (
    <span className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map((w, i) => (
        <span className="hero-line" key={i} aria-hidden="true" style={{ display: "inline-block", verticalAlign: "top" }}>
          <motion.span
            className="hero-word"
            initial={anim.initial}
            {...(inView
              ? { whileInView: anim.animate, viewport: { once: true, margin: "0px 0px -10% 0px" } }
              : { animate: anim.animate })}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE }}
          >
            {render(w)}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
