"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The gold thread that draws across the seven-step band. */
export default function ProcLine() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="proc-line"
      initial={reduce ? undefined : { scaleX: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.6, ease: EASE }}
    />
  );
}
