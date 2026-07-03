"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Module-scoped flag: true only during the very first hard load,
 * so the hero can time its entrance to the curtain lift. Client-side
 * navigations never re-trigger the preloader.
 */
let firstLoad = true;

/** Delay (s) other intro animations should wait before starting. */
export function introDelay(extra = 0) {
  return (firstLoad ? 1.35 : 0.15) + extra;
}

export default function Preloader() {
  const reduce = useReducedMotion();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      firstLoad = false;
      setGone(true);
    }, 1900);
    return () => clearTimeout(t);
  }, []);

  if (reduce || gone) return null;

  const letters = "ALTERRA".split("");

  return (
    <motion.div
      className="pre"
      aria-hidden="true"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      animate={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.85, delay: 1.05, ease: EASE }}
    >
      <span className="pre-word">
        {letters.map((l, i) => (
          <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.75, delay: 0.12 + i * 0.05, ease: EASE }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </span>
      <motion.span
        className="pre-rule"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      />
    </motion.div>
  );
}
